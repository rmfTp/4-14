const discussion = {
    items: [],
    tpl: null, 
   
    init() {
     
      this.tpl = document.getElementById('tpl').innerHTML
  
      const data = localStorage.getItem('todos')
      this.items = data ? JSON.parse(data) : []
  
      
      this.render()
    },
  
    
    add(item) {
  
    this.items.push(item)
    this.save()
    this.render()
    },

    remove(seq) {
        // 등록된 seq번호를 찾아서 등록된 스케줄 제거
        const index = this.items.findIndex((item) => item.seq === seq)
        if (index !== -1) {
          this.items.splice(index, 1)
          this.save()
        }
    
        // 목록 갱신
        this.render()
      },

    save() {
        const data = JSON.stringify(this.items)
        localStorage.setItem('todos', data)
      },
      render() {
        const targetEl = document.getElementById('schdule-items');
        targetEl.innerHTML = `<div class="spinner d-flex justify-content-center mt-5 mb-10">
                        <div class="spinner-grow text-success" role="status">
                            <span class="visually-hidden">등록된 스케줄을 조회하고 있습니다.</span>
                        </div>
                    </div>`
    
        if (this.items.length === 0) {
          setTimeout(() => {
            targetEl.innerHTML = `<div class="alert alert-warning" role="alert">등록된 스케줄이 없습니다.</div>`
          }, 1500)
          return
        }

        const domParser = new DOMParser()
        setTimeout(() => {
        targetEl.innerHTML = ''

            this.items.forEach(({ seq, user, content }) => {
                let html = discussion.tpl
                html = html
                .replace(/#{user}/g, user)
                .replace(/#{content}/g, content)
                
                const dom = domParser.parseFromString(html, 'text/html')
                const el = dom.querySelector('div')
                targetEl.append(el)
        
                // 삭제 버튼 이벤트 처리 S
                const removeEl = el.querySelector('.remove')
                removeEl.addEventListener('click', () => {
                if (confirm('정말 삭제하겠습니까?')) {
                    this.remove(seq)
                
              }
            })
            // 삭제 버튼 이벤트 처리 E
          })
        }, )
    }
}
        
    
    
    


window.addEventListener('DOMContentLoaded', function () {
    discussion.init()

  /**
   * 스케줄 등록 처리
   *
   */
  frmRegist.addEventListener('submit', function (e) {
    e.preventDefault() // 기본 동작 차단

    
    const requiredFields = {

      user: '이름을 입력하세요.',
      content: '내용을 입력하세요.',
    }


    // 에러메시지 초기화
    let errorEls = frmRegist.querySelectorAll('.alert')
    if (errorEls.length > 0) {
      errorEls.forEach((errorEl) => errorEl.parentElement.removeChild(errorEl))
    }

    for (const [field, message] of Object.entries(requiredFields)) {
      const value =
        typeof frmRegist[field].value === 'string'
          ? frmRegist[field].value?.trim()
          : ''
      if (!value) {
        errors.push(message)
      } else {
        item[field] = value
      }
    }




    // 검증실패한 경우 에러메세지 출력 및 실행 중단
    if (errors.length > 0) {
      errors.reverse()
      errors.forEach((m) => {
        errorEl = document.createElement('div')
        errorEl.className = 'alert alert-danger'
        errorEl.role = 'alert'
        errorEl.append(`${m}`)
        frmRegist.prepend(errorEl)
      })
      return
    }
    // 유효성 검사 E

    // 검증 성공한 경우 등록 처리
    discussion.add(item)

    // 등록 완료 후 초기화
    frmRegist.user.value = ''
    frmRegist.content.value = ''
  })

})