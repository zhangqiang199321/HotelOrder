var paramValues = UrlParam.paramValues("from");
var elems =  new Vue({
    el:"#exp",
    data:{
        roomDisplay:{
            title:'123',
            hotelId:"111",
        },
        userDate:{
            'user_id':'',
            'menu_list':[
                {url:'/loginout',name:'退出'}
            ],
            'entry_url':'123',
            'user_name':'123',
        },
    },
    methods:{
        getCookie: function(check_name) {
            // first we'll split this cookie up into name/value pairs
            // note: document.cookie only returns name=value, not the other components
            var a_all_cookies = document.cookie.split( ';' );
            var a_temp_cookie = '';
            var cookie_name = '';
            var cookie_value = '';
            var b_cookie_found = false; // set boolean t/f default f

            for (i = 0; i < a_all_cookies.length; i++) {
                // now we'll split apart each name=value pair
                a_temp_cookie = a_all_cookies[i].split( '=' );

                // and trim left/right whitespace while we're at it
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

                // if the extracted name matches passed check_name
                if (cookie_name == check_name) {
                    b_cookie_found = true;
                    // we need to handle case where cookie has no value but exists (no = sign, that is):
                    if (a_temp_cookie.length > 1) {
                        cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                    }
                    // note that in cases where cookie is initialized but no value, null is returned
                    return cookie_value;
                    break;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            if (!b_cookie_found) {
                return null;
            }
        },
        init:function() {
            var self = this;
            self.userbox = document.getElementById('userbox');
            if (self.getCookie('ajkAuthTicket')) {
                var cookie = self.getCookie('ajkAuthTicket');
                // this.userDate.menu_list=[cookie,123];
                self.updateUserInfo();
            }
        },
        updateUserInfo:function(){
            var self = this;
            // if( !self.isLogin() ){
            //     return
            // }
            var content = self.getUserHtml();
            self.userbox.innerHTML=content;
        },
        isLogin:function(){
            return this._userDate && this._userDate.user_id;
        },
        getUserHtml:function(){
            var config = this.userDate;
            var menuList = config.menu_list;

            var dropDownContent = "";
            for( var i = 0, iLength = menuList.length; i < iLength; i++) {
                var items =  menuList[i];
                dropDownContent = dropDownContent + '<li><a href="'+items.url+'">'+items.name+'</a></li>';
                // for(var j = 0, jLength = items.length; j < jLength; j++){
                //     dropDownContent = dropDownContent + '<li><a href="'+items.url+'">'+items.name+'</a></li>';
                // }
                if(i < iLength-1){
                    dropDownContent = dropDownContent + '<li class="hr"></li>';
                }
            }

            var html = ''
                +'<div class="userlogin userblock userblockfirst">'
                +    '<i class="icon icon-people"></i>'
                +    '<a class="link" href="'+ config.entry_url +'" rel="nofollow" title="'+config.user_name+'">'+config.user_name+'</a>'
                +    '<i class="triangle-down"></i>'
                +    '<ul>'+ dropDownContent +'</ul>'
                +'</div>';

            return html;
        },

},
    mounted:function() {
        var _this = this;
        paramValues = this.getCookie("hotelId");
        axios({
            method:'get',
            url:'/fangyuan/display/'+paramValues,
        }).then(function(res){
            _this.roomDisplay=res.data.data;
        });
        this.$nextTick(function () {
            this.init()
        })
    },

})