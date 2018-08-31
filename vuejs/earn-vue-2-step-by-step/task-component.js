Vue.component('task-list', {
    template: `
                <div>
                    <task v-for = "task in tasks" >{{ task.task }}</task>
                </div>`,
    data() {
        return {
            tasks: [
                { task: 'Go to the store', comleted: true },
                { task: 'Go to the bank', comleted: false },
                { task: 'Go to the farm', comleted: true },
                { task: 'Go to work', comleted: false }
            ]
        }
    }
});



Vue.component('task', {
    template: '<li><slot></slot></li>',
    data() {
        return {
            message: 'football'
        }
    }
});