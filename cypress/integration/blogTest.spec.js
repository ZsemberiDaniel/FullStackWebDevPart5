describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            body: { username: 'daniel', password: 'daniel' },
        });
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function() {
        cy.contains('username:');
        cy.contains('password:');
        cy.contains('Login');

        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button#login').should('exist');
    });

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('input#username').type('daniel');
            cy.get('input#password').type('daniel');
            cy.get('button#login').click();

            cy.contains('Logged in as daniel');
        });

        it('fails with wrong credentials', function() {
            cy.get('input#username').type('daniel');
            cy.get('input#password').type('wrnongpassword');
            cy.get('button#login').click();

            cy.contains('Wrong username or password!');

            cy.contains('username:');
            cy.contains('password:');
            cy.contains('Login');

            cy.get('input#username').should('exist');
            cy.get('input#password').should('exist');
            cy.get('button#login').should('exist');
        });
    });

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'daniel', password: 'daniel' });
        });

        it('A blog can be created', function() {
            cy.get('#userPage .toggleOn').click();
            cy.get('input#title').type('My title');
            cy.get('input#author').type('My author');
            cy.get('input#url').type('My URL');
            cy.get('button#createBlogButton').click();
            cy.contains('created!');
            cy.contains('My title');
            cy.contains('My author');
        });
    });

    describe('When there is one blog', () => {
        beforeEach(function() {
            cy.login({ username: 'daniel', password: 'daniel' });
            cy.create({ title: 'title', author: 'author', url: 'url', likes: 0 });
        });

        it('A blog can be liked', function() {
            cy.contains('show').click();
            cy.contains('likes: 0');
            cy.contains('like').click();
            cy.contains('likes: 1');
        });

        it('A blog can be deleted', function() {
            cy.contains('show').click();
            cy.contains('likes: 0');
            cy.contains('remove').click();
            cy.contains('Successfully removed post!');
            cy.get('.blog').should('have.length', 0);
        });
    });

    describe('When there is multiple blogs', () => {
        beforeEach(function() {
            cy.login({ username: 'daniel', password: 'daniel' });
            cy.create({ title: 'title', author: 'author', url: 'url', likes: 0 });
            cy.create({ title: 'title1', author: 'author1', url: 'url1', likes: 10 });
            cy.create({ title: 'title2', author: 'author2', url: 'url2', likes: 30 });
            cy.create({ title: 'title3', author: 'author3', url: 'url3', likes: 40 });
        });

        it('Blogs are ordered correctly', function() {
            cy.get('.toggleBlog').each($btn => {
                cy.wrap($btn).click();
            });
            cy.get('.blog').then($elements => {
                var strings = $elements.map($el => cy.wrap($el).get('.likeCount'));
                cy.wrap(strings).should('equal', strings.sort());
            });
        });
    });
});
