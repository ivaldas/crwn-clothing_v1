import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data';
// import PRODUCTS from '../shop-data.json';

export const CategoriesContext = createContext({
	categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
	const [ categoriesMap, setCategoriesMap ] = useState({});
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments('categories');
			// console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);
	const value = { categoriesMap };
	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
