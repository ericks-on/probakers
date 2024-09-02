import ProductsForm from "@/app/ui/products/products-form";
import ProductsTable from "@/app/ui/products/products-table";

export default function ProductsPage() {
    return (
        <div className="flex gap-4 pt-2 flex-col-reverse justify-end md:flex-row">
            <ProductsTable />
            <ProductsForm />
        </div>
    );
}