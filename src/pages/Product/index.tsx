import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";

export function ProductPage() {

    const navigate = useNavigate();

    const product = JSON.parse(localStorage.getItem('product') || '{}' as string);

    if (!product) {
        navigate('/');
    }

    return (
        <ProductCard product={product} />
    )
}