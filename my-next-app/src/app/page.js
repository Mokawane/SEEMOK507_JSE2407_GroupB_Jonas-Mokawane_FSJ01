import Products from "./products/page";

export default function Home() {
  return (
    <div>
      <main>
      <h1 className="text-center text-2xl font-bold mb-6">Welcome to Our Store</h1>
         <Products />
      </main>
      <footer>
      </footer>
    </div>
  );
}
