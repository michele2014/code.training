Vue.component('message', {
    props: ['title', 'body'],
    data() {
        return {
            isVisible: true
        }
    },
    template: `
            <article style = "border: 1px solid red" v-show = "isVisible">
                <button @click = "hide()">X</button>
                <p> {{ title }} </p>
                <p> {{ body }} </p>
            </article>`,
    methods: {
        hide() {
            this.isVisible = false;
        }
    }
});