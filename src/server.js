import { web } from "./application/web.js";

const PORT = process.env.PORT || 8000;

web.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});