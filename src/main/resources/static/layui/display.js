var paramValues = UrlParam.paramValues("from");
var elems =  new Vue({
    el:"#exp",
    data:{
        roomDisplay:{
            title:'123',
        }
    },
    methods:{

},
    mounted:function() {
        var _this = this;
        axios({
            method:'get',
            url:'/fangyuan/display/'+paramValues,
        }).then(function(res){
            _this.roomDisplay=res.data.data;
            console.log(_this.roomDisplay)
        });
    },
})