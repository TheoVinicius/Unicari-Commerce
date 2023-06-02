import { ProductsList } from "../../components/ProductsList";
import { faker } from '@faker-js/faker';

import hero from '../../assets/hero.jpg';

export function HomePage() {

    const sections = Array.apply(null, Array(4)).map(() => {

        const sectionName = faker.commerce.department();

        return {
            sectionName: sectionName,
            id: new Date().getTime().toString() + Math.random().toString(16).slice(2).toString(),
            products: Array.apply(null, Array(8)).map(() => ({
                imageSrc: faker.image.urlPicsumPhotos(),
                description: faker.commerce.productDescription(),
                sectionName: sectionName,
                id: new Date().getTime().toString() + Math.random().toString(16).slice(2).toString(),
                name: faker.commerce.productName(),
                color: faker.commerce.productMaterial(),
                price: +faker.commerce.price(),
            }))
        }
    });

    return (<>
        <img src={hero} className="w-screen h-52 lg:h-96 object-cover object-top" />
        {
            sections.map((section) => (
                <ProductsList products={section.products} sectionName={section.sectionName} key={section.id} />
            ))
        }
    </>
    )
}