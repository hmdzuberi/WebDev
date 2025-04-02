<template>
    <div>
        <h1>Book Management System</h1>
        <book-list :books="books" @edit-book="editBook" @delete-book="deleteBook" />
    </div>
</template>

<script>
import BookList from '../components/BookList.vue'
import BookService from '../services/BookService'

export default {
    components: {
        BookList
    },
    data() {
        return {
            books: []
        }
    },
    methods: {
        fetchBooks() {
            BookService.getAllBooks()
                .then(response => {
                    this.books = response.data
                })
                .catch(error => {
                    console.error('Error fetching books:', error)
                })
        },
        editBook(id) {
            this.$router.push(`/edit-book/${id}`);
        },
        deleteBook(id) {
            BookService.deleteBook(id)
                .then(() => {
                    this.fetchBooks()
                })
                .catch(error => {
                    console.error('Error deleting book:', error)
                })
        },
    },
    mounted() {
        this.fetchBooks()
    }
}
</script>