const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}
export async function getProductByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function getSearchResults(category, input) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  const results = data.Result
  const filteredResults = results.filter(e => {
    const elName = e.Name.toLowerCase();
    if (elName.includes(input.toLowerCase())) {
      return e
    }
  })
  return filteredResults
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}