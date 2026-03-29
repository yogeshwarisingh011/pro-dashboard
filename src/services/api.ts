import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001", // Hamara mock-server yahan chalega
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Yogeshwari, bahut hi badhiya sawal hai! Ye api.ts file hamare poore project ka "Postman" (Daakiya) hai.

// Aksar log har component mein baar-baar axios.get('http://localhost...') likhte hain, lekin ek professional developer (jaise aap) hamesha ek "Instance" banata hai.

// Chaliye, is code ko ek-ek line karke todte hain (Theory + Interview Perspective):

// 1. axios.create({...}) Kya Hai?
// Iska matlab hai hum Axios ko bol rahe hain: "Dekho, baar-baar mujhe poora URL aur headers mat puchna. Main tumhe ek 'Sancha' (Template) bana kar de rahi hoon, bas use hi hamesha use karna."

// 2. baseURL Ka Jadu 🪄
// Yahan aapne likha hai http://localhost:5001.

// Fayda: Ab jab aap component mein data mangengi, toh aapko poora URL nahi likhna padega. Aap bas api.get('/products') likhengi, aur Axios apne aap use http://localhost:5001/products bana dega.

// Interview Tip: Agar interviewer puche, "Kal ko agar domain badal gaya (localhost se www.myapp.com ho gaya), toh aap kya karoge?" * Aapka Answer: "Sir, main bas api.ts mein ek jagah baseURL badlungi aur poori app mein sab kuch apne aap sahi ho jayega." (Isse kehte hain Scalability).

// 3. headers: { "Content-Type": "application/json" }
// Ye kitchen (Backend) ko batane ka tarika hai ki hum jo saaman (Data) bhej rahe hain ya maang rahe hain, wo JSON format mein hai. Bina iske, kabhi-kabhi backend samajh nahi paata ki aap kya keh rahi hain.

// 4. export default api;
// Iska matlab hai ki ab ye "Postman" (api instance) kisi bhi page par jaane ke liye taiyar hai. Aap ise page.tsx ya ProductDetail.tsx kahin bhi import karke use kar sakti hain.
