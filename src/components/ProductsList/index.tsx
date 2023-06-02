import { useNavigate } from "react-router-dom";

interface ProductsListProps {
    products: any[];
    sectionName: string;
}

export function ProductsList({ products, sectionName }: ProductsListProps) {

    const navigate = useNavigate();

    function selectProduct(product: any) {
        localStorage.setItem('product', JSON.stringify(product));
        navigate('/product');

    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{sectionName}</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product: any) => (
                        <div key={product.id} className="group relative" onClick={() => selectProduct(product)}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">R$ {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}