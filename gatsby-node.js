// Implement the Gatsby API "onCreatePage". This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log({ 'page.path': page.path })
    // Only update the `/app` page.
    if (page.path === '/dashboard/') {
        console.log('dashboard', page.path.match(/\/dashboard$/))
    }
    if (page.path.match(/\/dashboard$/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        page.matchPath = '/dashboard/*'
        // Update the page.
        createPage(page)
    }
}
