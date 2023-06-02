import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export function ProductCard({ product }: any) {

    const navigate = useNavigate();

    async function addToCart() {

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        const res = await Swal.fire({
            title: 'Produto adicionado ao carrinho',
            text: 'O produto foi adicionado ao carrinho com sucesso, deseja continuar comprando?',
            icon: 'success',
            heightAuto: false,
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar comprando!',
            cancelButtonText: 'Não, ir para o carrinho!',
            reverseButtons: true,
            confirmButtonColor: 'rgb(153, 27, 27)',
        });

        if (res.isConfirmed) {
            navigate('/');
            return;
        }

        if (res.isDismissed && res.dismiss === Swal.DismissReason.cancel) {
            navigate('/cart');
            return;
        }
    }

    return (
        <div className="bg-white">
            <div className="pb-16 pt-6 sm:pb-24">
                <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-1">
                        <li className="text-sm">
                            <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.sectionName} {'>'}
                            </a>
                        </li>
                        <li className="text-sm">
                            <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-2">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
                                <p className="text-2xl font-medium text-gray-900">R$ {product.price}</p>
                            </div>
                            <div>
                                <h2 className="text-xl mt-6 font-medium text-gray-900">Descrição</h2>

                                <div
                                    className="text-lg mt-4 text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Imagens</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img
                                    src={product.imageSrc}
                                    className={
                                        'lg:col-span-2 lg:row-span-2 rounded-2xl'
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            <div>
                                <button
                                    onClick={addToCart}
                                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-red-800 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
