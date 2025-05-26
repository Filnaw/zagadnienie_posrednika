# app.py
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

def calculate_profit_matrix(c, kz, kt):
    m, n = len(kz), len(c)
    profit_matrix = np.zeros((m, n))
    for i in range(m):
        for j in range(n):
            profit_matrix[i][j] = c[j] - kz[i] - kt[i][j]
            # print( str(c[j])  + " - " + str(kz[i]) + " - " + str(kt[i][j]))
            # print(profit_matrix[i][j])
        print("\n")   
    return profit_matrix

def add_fictitious_nodes(supply, demand, profit_matrix):
    supply_sum = sum(supply)
    demand_sum = sum(demand)
    m, n = len(supply), len(demand)

    if supply_sum != demand_sum:
        supply.append(demand_sum)
        demand.append(supply_sum)
        print ("supply + fic: " + str(sum(supply)) + "demand + fic: " + str(sum(demand)))

        profit_matrix = np.append(profit_matrix, np.zeros((profit_matrix.shape[0], 1)), axis=1)

        zero_row = np.zeros((1, profit_matrix.shape[1]))
        profit_matrix = np.append(profit_matrix, zero_row, axis=0)
        for row in profit_matrix:
            print(row)


    return supply, demand, profit_matrix

import numpy as np

def vogel_approximation_method(supply, demand, profit_matrix):
    """
    Tworzy początkowy plan transportu według reguły maksymalnego elementu macierzy,
    najpierw między rzeczywistymi dostawcami i odbiorcami, potem z udziałem węzłów fikcyjnych.
    """
    # lokalne kopie, żeby nie nadpisać oryginałów
    rem_supply = supply.copy()
    rem_demand = demand.copy()
    m, n = profit_matrix.shape
    allocation = np.zeros((m, n), dtype=float)

    # liczba rzeczywistych dostawców i odbiorców
    m0 = len(supply) - 1
    n0 = len(demand) - 1

    def allocate(i_indices, j_indices):
        """Alokuj greedy w obrębie zadanych indeksów."""
        nonlocal rem_supply, rem_demand, allocation
        while any(rem_supply[i] > 0 for i in i_indices) and any(rem_demand[j] > 0 for j in j_indices):
            # zbuduj maskę zysków, reszta = -inf
            mask = np.full((m, n), -np.inf)
            for i in i_indices:
                for j in j_indices:
                    if rem_supply[i] > 0 and rem_demand[j] > 0:
                        mask[i, j] = profit_matrix[i, j]
            # znajdź pozycję największego zysku
            idx = np.unravel_index(np.argmax(mask), mask.shape)
            if mask[idx] == -np.inf:
                break
            i_max, j_max = idx
            qty = min(rem_supply[i_max], rem_demand[j_max])
            allocation[i_max, j_max] = qty
            rem_supply[i_max] -= qty
            rem_demand[j_max] -= qty

    # 1) faza real–real
    allocate(range(m0), range(n0))
    # 2) faza z udziałem fikcyjnych
    allocate(range(m), range(n))

    print(allocation)
    return allocation



def compute_financials(allocation, profit_matrix, kz, kt):
    total_profit = 0
    total_cost = 0
    total_transport = 0
    total_revenue = 0

    for i in range(len(allocation)):
        for j in range(len(allocation[0])):
            quantity = allocation[i][j]
            if quantity > 0:
                revenue = quantity * (profit_matrix[i][j] + kz[i] + kt[i][j])
                cost = quantity * kz[i]
                transport = quantity * kt[i][j]
                total_profit += quantity * profit_matrix[i][j]
                total_cost += cost
                total_transport += transport
                total_revenue += revenue

    return total_cost, total_transport, total_revenue, total_profit

def get_basis(allocation):
    basis = []
    for i in range(len(allocation)):
        for j in range(len(allocation[0])):
            if allocation[i][j] > 0:
                basis.append((i, j))
    return basis

def calculate_dual_variables(profit_matrix, allocation):
    m, n = profit_matrix.shape
    u = [None] * m
    v = [None] * n
    basis = get_basis(allocation)

    u[0] = 0  # arbitrarily set one dual variable to 0
    updated = True
    while updated:
        print("did it")
        updated = False
        for i, j in basis:
            if u[i] is not None and v[j] is None:

                v[j] = profit_matrix[i][j] - u[i]
                print("v[" + str(j) +  " ]: " + str(v[j]) + "ZJ: " + str(profit_matrix[i][j]) + " - " + str(u[i]) )
                updated = True
            elif u[i] is None and v[j] is not None:
                u[i] = profit_matrix[i][j] - v[j]
                print("u[" + str(i) + "]: " + str(u[i]) + "ZJ: " + str(profit_matrix[i][j]) + " - " + str(v[j]) )
                updated = True
    return u, v

def calculate_criterion_variables(profit_matrix, u, v):
    m, n = profit_matrix.shape
    delta = np.zeros((m, n))
    for i in range(m):
        for j in range(n):
            if u[i] is not None and v[j] is not None:
                delta[i][j] = profit_matrix[i][j] - u[i] - v[j]
            else:
                delta[i][j] = np.nan
    return delta

def improve_solution(allocation, profit_matrix):
    # while True:
    u, v = calculate_dual_variables(profit_matrix, allocation)
    delta = calculate_criterion_variables(profit_matrix, u, v)
    print("Dual variables u:", u)
    print("Dual variables v:", v)
    print("Criterion variables Δ:")
    print(delta)
    # max_delta = np.nanmax(delta)
    # if max_delta <= 0:
    #     break  # optimum found
    # Find position of maximum delta to allocate
    i, j = np.unravel_index(np.nanargmax(delta), delta.shape)
    # Add artificial positive allocation to (i,j)
    allocation[i][j] = 0.0001  # minimal positive value to include in basis

    return allocation


@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    supply = data['supply']      # list of size 2
    print("supply: " + str(len(data['supply'])))
    demand = data['demand']      # list of size 3
    kz = data['purchase_cost']   # list of size 2
    c = data['sale_price']       # list of size 3
    kt = data['transport_cost']  # 2D list 2x3

    
    kt_extended = kt.copy()
    while len(kt_extended) < len(supply):
        kt_extended.append([0] * len(demand))


    profit_matrix = calculate_profit_matrix(c, kz, kt)
    supply, demand, profit_matrix = add_fictitious_nodes(supply, demand, profit_matrix)
    allocation = vogel_approximation_method(supply, demand, profit_matrix)
    allocation = improve_solution(allocation, profit_matrix)
    total_cost, total_transport, total_revenue, total_profit = compute_financials(
        allocation, profit_matrix, kz + [0] * (len(supply) - len(kz)), kt_extended
    )
    

    return jsonify({
        'allocation': allocation.tolist(),
        'profit_matrix': profit_matrix.tolist(),
        'total_cost': total_cost,
        'total_transport': total_transport,
        'total_revenue': total_revenue,
        'total_profit': total_profit
    })

if __name__ == '__main__':
    app.run(debug=True)
