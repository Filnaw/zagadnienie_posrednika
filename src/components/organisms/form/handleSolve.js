export const handleSolve = async (setResult) => {
    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? Number(el.value) : null;
    };

    const demand = [
        getValue("demand-customer-1"),
        getValue("demand-customer-2"),
        getValue("demand-customer-3"),
    ];

    const sale_price = [
        getValue("sell-customer-1"),
        getValue("sell-customer-2"),
        getValue("sell-customer-3"),
    ];

    const supply = [
        getValue("supply-supplier-1"),
        getValue("supply-supplier-2"),
    ];

    const purchase_cost = [
        getValue("price-supplier-1"),
        getValue("price-supplier-2"),
    ];

    const transport_cost = [
        [getValue("t11"), getValue("t12"), getValue("t13")],
        [getValue("t21"), getValue("t22"), getValue("t23")],
    ];

    const allValues = [
        ...demand, ...sale_price, ...supply, ...purchase_cost,
        ...transport_cost[0], ...transport_cost[1]
    ];

    const hasInvalid = allValues.some(v => isNaN(v) || v === null);

    if (hasInvalid) {
        alert("❌ Brak danych! Uzupełnij wszystkie pola.");
        return;
    }

    const payload = {
        supply,
        demand,
        purchase_cost,
        sale_price,
        transport_cost,
    };


    try {
        const res = await fetch("http://127.0.0.1:5000/solve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setResult(data);
    } catch (error) {
        console.error("Błąd żądania:", error);
    }
};
