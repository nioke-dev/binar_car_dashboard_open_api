import App from "./server";

const PORT: number = 3000;
const app = new App().app;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
