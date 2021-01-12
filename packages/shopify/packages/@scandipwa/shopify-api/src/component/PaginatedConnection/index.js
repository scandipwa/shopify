/**

query(
    after
    first
    reverse
    last
    before
    sortKey
    query // <-- JUST IN CASE
) {
    edges {
        cursor
        node
    }
    pageInfo {
        hasNextPage
        hasPreviousPage
    }
}

Goal:
1. Provide fetching implementation
2. Provide paginating API
3. Expose node back to client

Usage:

<PaginatedConnection
    query = Query.getQuery() // the query to use
    PageComponent = CategoryPage // component to render page
    PagePlaceholderComponent = CategoryPagePlaceholder // placeholder for the page
    PaginationComponent = Pagination // component to render pagination
/>

*/
