addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    // List all keys from KV (e.g., author_1, author_2, etc.)
    const keys = await QUOTES_KV.list();
  
    if (keys.keys.length > 0) {
      // Randomly select a key from the KV store
      const randomKey = keys.keys[Math.floor(Math.random() * keys.keys.length)].name;
      
      // Fetch the corresponding author and quote data from KV
      const authorData = await QUOTES_KV.get(randomKey);
  
      if (authorData) {
        return new Response(authorData, {
          headers: { "content-type": "application/json" },
        });
      }
    }
  
    // If no data is found, return an error
    return new Response(JSON.stringify({ error: "No quotes found" }), {
      headers: { "content-type": "application/json" },
      status: 404,
    });
  }
  