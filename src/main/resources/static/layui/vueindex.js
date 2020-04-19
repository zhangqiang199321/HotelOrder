var elems =  new Vue({
    el:".w1180",
    data:{
        typeData:{
            '全部':'/fangyuan/jiangninga/fx0',
            '单人床':'/fangyuan/jiangninga/fx1',
            '双人床':'/fangyuan/jiangninga/fx2'
        },
        topicData:{
            '全部':'/fangyuan/jiangninga/x0',
            '优惠':'/fangyuan/jiangninga/x1',
            '主题':'/fangyuan/jiangninga/x2'
        },
        priceData:{
            '全部':'/fangyuan/jiangninga/zj200',
            '200以下':'/fangyuan/jiangninga/zj201',
            '200到300':'/fangyuan/jiangninga/zj202',
            '300到500':'/fangyuan/jiangninga/zj203',
            '500到1000':'/fangyuan/jiangninga/zj204',
            '1000以上':'/fangyuan/jiangninga/zj205'
        },
        morenData:{
            '默认':'/fangyuan/jiangninga/moren',
        },
        zujinData:{
            '租金':'/fangyuan/jiangninga/zujin',
        },
        zuixinData:{
            '最新':'/fangyuan/jiangninga/zuixin',
        },
        userDate:{
            'user_id':'',
            'menu_list':[
                [1],
                [2]
            ],
            'entry_url':'123',
            'user_name':'123',
        },
        currentPriceIndex:0,
        currentTypeIndex:0,
        currentTopicIndex:0,
        currentRankIndex:0,
        room: {
        }
    },
    methods:{
        price:function(index,value,click){
            var valueP = value.split("/");
            var lay = valueP.length;
            var valuePElement = valueP[lay-1];
            var may= document.cookie.split(";");
            for(var i=0;i<may.length;i++){
                var key = may[i].split("=")[0].trim();
                if("" != may[i].split("=")[1]){
                    if('type'== key && key != click){
                        value = value +"-"+ may[i].split("=")[1];
                    }else if('topic'== key && key != click){
                        value = value +"-"+ may[i].split("=")[1];
                    }else if('myPrice'== key && key != click){
                        value = value +"-"+ may[i].split("=")[1];
                    }else if('rank'==key && key != click){
                        value = value +"-"+ may[i].split("=")[1];
                    }
                }
            }
            var _this = this;
            axios({
                method:'get',
                url:value,
            }).then(function(res){
                _this.room=res.data.data;
            });
            console.log(this.room[0].name);
            if('myPrice'== click){
                this.currentPriceIndex = index;
            }else if('topic'== click){
                this.currentTopicIndex = index;
            }else if('type'== click){
                this.currentTypeIndex = index;
            }else if('rank'== click){
                this.currentRankIndex = index;
            }
            document.cookie = click+"=" + "";
            document.cookie = click+"=" + valuePElement;
        },
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
                for(var j = 0, jLength = items.length; j < jLength; j++){
                    dropDownContent = dropDownContent + '<li><a href="'+items[j].url+'">'+items[j].name+'</a></li>';
                }
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
        var may= document.cookie.split(";");
        for(var i=0;i<may.length;i++){
            var key = may[i].split("=")[0].trim();
            if('type'== key){
                document.cookie = "type="+"";
            }else if('myPrice'== key){
                document.cookie = "myPrice="+"";
            }else if('topic'== key){
                document.cookie = "topic="+"";
            }else if('rank'== key){
                document.cookie = "rank="+"";
            }
        }
        var _this = this;
        axios({
            method:'get',
            url:'/fangyuan/jiangninga/111',
        }).then(function(res){
            _this.room=res.data.data;
        });
        console.log(this.room);
        this.$nextTick(function () {
            this.init()
        })
        }
})