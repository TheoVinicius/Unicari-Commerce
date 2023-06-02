import { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const navigation = {
    pages: [
        { name: 'Produtos', url: '/' },
        { name: 'Carrinho', url: '/cart' },
    ],
}

export function Header() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    return (
        <div className="bg-white">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root cursor-pointer" onClick={() => navigate(page.url)}>
                                            <a className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">
                    <div className="bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="border-b border-gray-200 pb-3 pt-6">
                                <div className="flex h-16 items-center justify-between">
                                    <div onClick={() => navigate('/')} className="hidden lg:flex lg:flex-1 lg:items-center cursor-pointer">
                                        <span className="sr-only">UNI CARI-COMMERCE</span>
                                        <img
                                            className="h-16 w-auto"
                                            src={logo}
                                            alt=""
                                        />
                                    </div>

                                    <div className="hidden h-full lg:flex">
                                        <Popover.Group className="inset-x-0 bottom-0 px-4">
                                            <div className="flex h-full justify-center space-x-8">
                                                {navigation.pages.map((page) => (
                                                    <a
                                                        onClick={() => navigate(page.url)}
                                                        key={page.name}
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                                                    >
                                                        {page.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </Popover.Group>
                                    </div>

                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button
                                            type="button"
                                            className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setOpen(true)}
                                        >
                                            <span className="sr-only">Abrir Menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <span onClick={() => navigate('/')} className="lg:hidden  cursor-pointer">
                                        <span className="sr-only">UNI CARI-COMMERCE</span>
                                        <img
                                            src={logo}
                                            alt=""
                                            className="h-16 w-auto"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
