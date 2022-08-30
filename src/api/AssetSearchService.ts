export async function findObjectByID(id: Number) {
    console.log(id);
    const response = await fetch(`api/product/location/current/?objectNo=` + {id}, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}