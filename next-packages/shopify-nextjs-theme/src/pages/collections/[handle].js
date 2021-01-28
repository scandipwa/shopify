import { useRouter } from 'next/router';

/** @namespace ShopifyNextjsTheme/Pages/Collections/[Handle]/CollectionsHandle */
export const CollectionsHandle = () => {
    const router = useRouter();
    const { handle } = router.query;

    return (
        <div>
            { `The /collections/${ handle } route` }
        </div>
    );
};

export default CollectionsHandle;
