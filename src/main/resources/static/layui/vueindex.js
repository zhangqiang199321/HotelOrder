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
        console.log(this.room)
    }
})