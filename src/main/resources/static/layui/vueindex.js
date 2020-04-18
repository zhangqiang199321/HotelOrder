var elems =  new Vue({
    el:".w1180",
    data:{
        typeData:{
            '全部':'/fangyuan/jiangninga/',
            '单人床':'/fangyuan/jiangninga/fx1',
            '双人床':'/fangyuan/jiangninga/fx2'
        },
        topicData:{
            '全部':'/fangyuan/jiangninga/',
            '优惠':'/fangyuan/jiangninga/x1',
            '主题':'/fangyuan/jiangninga/x2'
        },
        priceData:{
            '全部':'/fangyuan/jiangninga/',
            '200以下':'/fangyuan/jiangninga/zj201',
            '200到300':'/fangyuan/jiangninga/zj202',
            '300到500':'/fangyuan/jiangninga/zj203',
            '500到1000':'/fangyuan/jiangninga/zj204',
            '1000以上':'/fangyuan/jiangninga/zj205'
        },
        currentPriceIndex:0,
        currentTypeIndex:0,
        currentTopicIndex:0,
    },
    methods:{
        type(index,value){
            document.cookie='type='+index;
            var valueP = value.split("/");
            let lay = valueP.length;
            const valuePElement = valueP[lay-1];
            for(let i in this.priceData){
                if(i == 0){
                    document.cookie = this.priceData[i]+'='+this.priceData[i]+valuePElement;
                }else{
                    document.cookie = this.priceData[i]+'='+this.priceData[i]+"-"+valuePElement;
                }
            }
        },
        topic(index,value){
            document.cookie='topic='+index;
        },
        price(index,value){
            document.cookie='myPrice='+index;
        },
    },
    mounted() {
        var may= document.cookie.split(";");
        for(var i=0;i<may.length;i++){
            let key = may[i].split("=")[0].trim();
            if('type'== key){
                this.currentTypeIndex = may[i].split("=")[1];
            }else if('myPrice'== key){
                this.currentPriceIndex = may[i].split("=")[1];
            }else if('topic'== key){
                this.currentTopicIndex = may[i].split("=")[1];
            }
        }
        if(null == this.currentPriceIndex){
            this.currentPriceIndex = 0;
        }
        if(null == this.currentTypeIndex){
            this.currentTypeIndex = 0;
        }
        if(null == this.currentTopicIndex){
            this.currentTopicIndex = 0;
        }
    }
})