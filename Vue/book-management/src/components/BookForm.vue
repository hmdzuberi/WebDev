<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" v-model="form.title" required>
        </div>
        <div>
            <label for="author">Author</label>
            <input type="text" id="author" v-model="form.author" required>
        </div>
        <div>
            <label for="genre">Genre</label>
            <input type="text" id="genre" v-model="form.genre" required>
        </div>
        <div>
            <label for="isbn">ISBN</label>
            <input type="text" id="isbn" v-model="form.isbn" required>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script>
export default {
    props: ['book'],
    data() {
        return {
            form: {
                title: this.book?.title || '',
                
            }
        }
    }
}
</script>