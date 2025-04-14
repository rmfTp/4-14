window.addEventListener('DOMContentLoaded',function(){
    remove(seq){
        const index = this.items.findIndex((item) => item.seq = seq);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }
    const removeEl = el.querySelector('.remove');
    removeEl.addEventListener('click', () => {
        if (confirm('정말 삭제하겠습니까?')) {
            this.remove(seq)
        }
    });
})