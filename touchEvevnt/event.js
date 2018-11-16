function $(dom) {
    return $.prototype.init(dom)
}

$.prototype = {

    init(el) {
        if (typeof el == "string") {
            let arr = el.split(" ")
            this.el = this.elEvery(arr)

        } else {
            this.el = el
        }

        return this
    },

    elEvery(arr) {

        let domArr = []

        function every(dom, el, arrIndex) {
            dom.forEach((i) => {
                if (arrIndex < arr.length - 1) {
                    every(Array.from(i.querySelectorAll(el)), arr[arrIndex + 1], arrIndex + 1)
                } else {
                    // domArr=[...domArr,...Array.from(i.querySelectorAll(el))]
                    domArr.push(...Array.from(i.querySelectorAll(el)))
                }
            })
        }
        every([document], arr[0], 0)
        return domArr
    },
    attr(attr, val) {
        if (!val) {
            return this.el.getAttribute(attr)
        } else {
            this.el.setAttribute(attr, val)
            return this
        }
    },
    tap(cb) {
        let start, end, state = true
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)
                i.addEventListener("touchmove", handle)
                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)
            this.el.addEventListener("touchmove", handle)
            this.el.addEventListener("touchend", handle)
        }
        return this


        function handle(e) {
            switch (e.type) {
                case "touchstart":
                    {
                        start = new Date().getTime()
                        state = true
                    }
                    break;
                case "touchmove":
                    {
                        state = false
                    }
                    break;
                case "touchend":
                    {
                        end = new Date().getTime()
                        if (end - start <= 300 && state) {
                            cb(e)
                        }
                    }
                    break;
            }
        }

    },
    longtap(cb) {
        let time
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)
                i.addEventListener("touchmove", handle)
                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)
            this.el.addEventListener("touchmove", handle)
            this.el.addEventListener("touchend", handle)
        }
        return this

        function handle(e) {

            switch (e.type) {
                case "touchstart":
                    {
                        time = setTimeout(cb, 300)
                    }
                    break;
                case "touchmove":
                    {
                        clearTimeout(time)
                    }
                    break;
                case "touchend":
                    {
                        clearTimeout(time)
                    }
                    break;
            }
        }
    },
    move(type, cb) {
        let startX, endX, startY, endY
        if (this.el instanceof Array) {
            this.el.forEach((i) => {
                i.addEventListener("touchstart", handle)

                i.addEventListener("touchend", handle)
            });
        } else {
            this.el.addEventListener("touchstart", handle)

            this.el.addEventListener("touchend", handle)
        }


        function handle(e) {
            switch (e.type) {
                case "touchstart":
                    {
                        startX = e.changedTouches[0].pageX
                        startY = e.changedTouches[0].pageY
                    }
                    break;
                case "touchend":
                    {
                        endX = e.changedTouches[0].pageX
                        endY = e.changedTouches[0].pageY
                        switch (type) {
                            case "moveLeft":
                                {
                                    if (startX - endX > 25) {
                                        if (Math.abs(startY - endY) < Math.abs(startX - endX)) {

                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveRight":
                                {
                                    if (endX - startY > 25) {
                                        if (Math.abs(startY - endY) < Math.abs(startX - endX)) {

                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveTop":
                                {
                                    if (startY - endY > 25) {
                                        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
                                            cb(e)
                                        }
                                    }
                                }
                                break;
                            case "moveBottom":
                                {
                                    if (endY - startY > 25) {
                                        if (Math.abs(startY - endY) > Math.abs(startX - endX)) {
                                            cb(e)
                                        }
                                    }
                                }
                                break;
                        }

                    }
                    break;
            }
        }




    },
    moveLeft(cb) {

        this.move("moveLeft", cb)

        return this
    },
    moveRight(cb) {

        this.move("moveRight", cb)

        return this

    },
    moveTop(cb) {

        this.move("moveTop", cb)
        return this

    },
    moveBottom(cb) {

        this.move("moveBottom", cb)
        return this
    },
}
