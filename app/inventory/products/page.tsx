import { getProducts } from "@/app/actions/products";
import ProductsForm from "@/app/ui/products/products-form";
import ProductsTable from "@/app/ui/products/products-table";

export default async function ProductsPage() {
    const items = await getProducts();
    let dates = [] as string[];
    if (typeof items !== 'string') {
        dates = items.map((item) => item.createdAt.toISOString().split('T')[0]);
        dates = [...new Set(dates)];
    }
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <ProductsTable items={items} dates={dates} />
            <ProductsForm />
        </div>
    );
}


// import ProductsForm from "@/app/ui/products/products-form";
// import ProductsTable from "@/app/ui/products/products-table";

// export default function ProductsPage() {
//     return (
//         <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
//             <ProductsTable />
//             <ProductsForm />
//         </div>
//     );
// }