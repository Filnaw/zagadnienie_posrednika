# app.py
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

def find_cycle(basis, start):

    rows = {}
    cols = {}
    for i, j in basis:
        rows.setdefault(i, []).append(j)
        cols.setdefault(j, []).append(i)

    def backtrack(path, look_row):
        cur_i, cur_j = path[-1]
        if look_row:
            for nj in rows.get(cur_i, []):
                nxt = (cur_i, nj)
                if nxt == start and len(path) >= 4:
                    return path + [start]
                if nxt not in path:
                    res = backtrack(path + [nxt], not look_row)
                    if res:
                        return res
        else:
            for ni in cols.get(cur_j, []):
                nxt = (ni, cur_j)
                if nxt == start and len(path) >= 4:
                    return path + [start]
                if nxt not in path:
                    res = backtrack(path + [nxt], not look_row)
                    if res:
                        return res
        return None

    return backtrack([start], True) or backtrack([start], False)


def adjust_allocation(allocation, entering):

    basis = [(i, j) for i in range(allocation.shape[0])
                      for j in range(allocation.shape[1])
                      if allocation[i, j] > 0]
    basis.append(entering)

    cycle = find_cycle(basis, entering)
    if not cycle:
        raise ValueError(f"Nie znaleziono cyklu dla wejścia {entering}")

    minus_positions = cycle[1::2]  
    theta = min(allocation[i, j] for i, j in minus_positions)

    for idx, (i, j) in enumerate(cycle[:-1]):
        if idx % 2 == 0:
            allocation[i, j] += theta
        else:
            allocation[i, j] -= theta

    return allocation


def calculate_profit_matrix(c, kz, kt):
    m, n = len(kz), len(c)
    profit_matrix = np.zeros((m, n))
    for i in range(m):
        for j in range(n):
            profit_matrix[i, j] = c[j] - kz[i] - kt[i][j]
    return profit_matrix


def add_fictitious_nodes(supply, demand, profit_matrix):
    supply_sum = sum(supply)
    demand_sum = sum(demand)

    if supply_sum != demand_sum:

        supply.append(demand_sum)
        demand.append(supply_sum)


        zero_col = np.zeros((profit_matrix.shape[0], 1))
        profit_matrix = np.hstack([profit_matrix, zero_col])

        zero_row = np.zeros((1, profit_matrix.shape[1]))
        profit_matrix = np.vstack([profit_matrix, zero_row])

    return supply, demand, profit_matrix


def vogel_approximation_method(supply, demand, profit_matrix):

    rem_supply = supply.copy()
    rem_demand = demand.copy()
    m, n = profit_matrix.shape
    allocation = np.zeros((m, n), dtype=float)

    def allocate(i_indices, j_indices):
        nonlocal rem_supply, rem_demand, allocation
        while any(rem_supply[i] > 0 for i in i_indices) and any(rem_demand[j] > 0 for j in j_indices):
            mask = np.full((m, n), -np.inf)
            for i in i_indices:
                for j in j_indices:
                    if rem_supply[i] > 0 and rem_demand[j] > 0:
                        mask[i, j] = profit_matrix[i, j]
            idx = np.unravel_index(np.argmax(mask), mask.shape)
            if mask[idx] == -np.inf:
                break
            i_max, j_max = idx
            qty = min(rem_supply[i_max], rem_demand[j_max])
            allocation[i_max, j_max] = qty
            rem_supply[i_max] -= qty
            rem_demand[j_max] -= qty


    allocate(range(m), range(n))
    return allocation


def compute_financials(allocation, profit_matrix, kz, kt, original_demand):

    total_profit = 0
    total_cost = 0
    total_transport = 0
    total_revenue = 0

    

    m, n = allocation.shape


    real_supplier_count = m - 1
    orig_n = len(original_demand)

    for i in range(real_supplier_count):
        row_qty_sum = allocation[i, :orig_n].sum()
        total_cost += row_qty_sum * kz[i]

    for i in range(m):
        for j in range(n):
            quantity = allocation[i, j]
            if quantity > 0:
                transport = quantity * kt[i][j]
                total_profit += quantity * profit_matrix[i, j]
                total_transport += transport

    for j in range(orig_n):

        qty_sum = allocation[:real_supplier_count, j].sum()
        contrib = qty_sum * original_demand[j]

        total_revenue += contrib        

    return total_cost, total_transport, total_revenue, total_profit


def get_basis(allocation):
    basis = []
    for i in range(allocation.shape[0]):
        for j in range(allocation.shape[1]):
            if allocation[i, j] > 0:
                basis.append((i, j))
    return basis


def calculate_dual_variables(profit_matrix, allocation):
    m, n = profit_matrix.shape
    u = [None] * m
    v = [None] * n
    basis = get_basis(allocation)

    u[0] = 0
    updated = True
    while updated:
        updated = False
        for i, j in basis:
            if u[i] is not None and v[j] is None:
                v[j] = profit_matrix[i, j] - u[i]
                updated = True
            elif u[i] is None and v[j] is not None:
                u[i] = profit_matrix[i, j] - v[j]
                updated = True
    return u, v


def calculate_criterion_variables(profit_matrix, u, v):
    m, n = profit_matrix.shape
    delta = np.full((m, n), np.nan)
    entering = None
    max_val = float('-inf')

    for i in range(m):
        for j in range(n):
            if u[i] is not None and v[j] is not None:
                delta[i, j] = profit_matrix[i, j] - u[i] - v[j]
                if delta[i, j] > max_val:
                    max_val = delta[i, j]
                    entering = (i, j)
    return delta, entering, max_val


@app.route('/solve', methods=['POST'])
def solve():
    data = request.json
    supply = data['supply'][:]           
    demand = data['demand'][:]           
    kz = data['purchase_cost'][:]        
    c = data['sale_price'][:]            
    kt_orig = data['transport_cost'][:] 


    profit_matrix = calculate_profit_matrix(c, kz, kt_orig)


    supply, demand, profit_matrix = add_fictitious_nodes(supply, demand, profit_matrix)


    m, n = profit_matrix.shape 
    kt_extended = np.zeros((m, n))
    m0 = len(kt_orig)      
    n0 = len(kt_orig[0])    

    for i in range(m0):
        for j in range(n0):
            kt_extended[i, j] = kt_orig[i][j]



    allocation = vogel_approximation_method(supply, demand, profit_matrix)


    while True:
        u, v = calculate_dual_variables(profit_matrix, allocation)
        delta, entering, max_delta = calculate_criterion_variables(profit_matrix, u, v)


        if max_delta is None or max_delta <= 0:
            break


        allocation = adjust_allocation(allocation, entering)


    total_cost, total_transport, total_revenue, total_profit = compute_financials(
        allocation, profit_matrix, kz, kt_extended, c
    )

    return jsonify({
        'allocation':     allocation.tolist(),
        'profit_matrix': profit_matrix.tolist(),
        'total_cost':     total_cost,
        'total_transport': total_transport,
        'total_revenue':  total_revenue,
        'total_profit':   total_profit
    })


if __name__ == '__main__':
    app.run(debug=True)
