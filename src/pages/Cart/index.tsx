import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function CartPage() {

    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

    const navigate = useNavigate();

    function removeFromCart(index: number) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        setProducts(cart);
    }

    function setQuantity(index: number, quantity: number) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        setProducts(cart);
    }

    async function checkout() {
        const res = await Swal.fire({
            title: 'Finalizar compra',
            text: 'Deseja finalizar a compra?',
            icon: 'question',
            heightAuto: false,
            showCancelButton: true,
            confirmButtonText: 'Sim, finalizar!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true,
            confirmButtonColor: 'rgb(153, 27, 27)'
        });

        if (!res.isConfirmed) {
            return;
        }

        localStorage.setItem('cart', '[]');
        navigate('/');
        Swal.fire({
            title: 'Compra finalizada',
            text: 'Sua compra foi finalizada com sucesso!',
            icon: 'success',
            heightAuto: false,
            confirmButtonText: 'Certo!',
            confirmButtonColor: 'rgb(153, 27, 27)'
        });
    }

    useEffect(() => {
        if (products.length === 0 || !products) {
            Swal.fire({
                title: 'Carrinho vazio',
                text: 'Adicione produtos ao carrinho para continuar',
                icon: 'warning',
                confirmButtonText: 'Certo!',
                heightAuto: false,
                confirmButtonColor: 'rgb(153, 27, 27)'
            })
            navigate('/');
        }
    }, [products]);

    const totalPrice = useCallback(() => products.reduce((acc: number, product: any) => acc + (product.price * (product.quantity || 1)), 0), [products])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {products.map((product: any, productIdx: number) => (
                                <li key={product.id} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={product.imageSrc}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{product.color}</p>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">Preço unitário: R$ {product.price}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-900">Preço total: R$ {product.price * (product.quantity || 1)}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <select
                                                    onChange={() => setQuantity(productIdx, Number((document.getElementById(`quantity-${productIdx}`) as HTMLSelectElement).value))}
                                                    id={`quantity-${productIdx}`}
                                                    name={`quantity-${productIdx}`}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                </select>

                                                <div className="absolute right-0 top-0" onClick={() => removeFromCart(productIdx)}>
                                                    <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Remover</span>
                                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />

                                            <span>Em estoque!</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Resumo do pedido
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">R${totalPrice()}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Estimativa de Frete</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">R$ 5.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Taxa de serviço</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">R$8.32</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Total do pedido</dt>
                                <dd className="text-base font-medium text-gray-900">R${totalPrice() + 5 + 8.32}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                onClick={checkout}
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-red-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Comprar
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
