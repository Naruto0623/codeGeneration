const Init = compoenntName => {
  return `export default {
  name: '${ compoenntName }',
  components: {},
  data(){
    return {
      
    }
  },
  computed: {},
  methods:{
    main() {
      
    }
  },
  created(){

  }
}
`
};
const Table = compoenntName => {
  return `import { ${ compoenntName } } from '@/libs/kendo-props'
import deleteModal from 'delete-modal';
import deleMixin from '@/mixins/deleModal'

export default {
  name: '${ compoenntName }',
  components: {
    deleteModal
  },
  mixins: [ deleMixin ],
  data(){
    return {
      kendoProps: ${ compoenntName },
      kendoParams: {
        objectType: "",
      },
      kendoFilters: [],
      //kendo选中当前行数据
      selectItem: [],
      //kendo选中id集合
      selectIds: [],
    }
  },
  computed: {},
  methods:{
    //kendo选中当前行数据数组
    selectData( selectArr, ids ){
      this.selectItem = selectArr;
      this.selectIds = ids;
    },
  },
  created(){

  }
}
`
};
const Modal = compoenntName => {
  return `import { objectInit, setRequired } from '@/libs/toods.js'
import { active } from '@/libs/selectLabel.js';
import openModal from '@/mixins/openModal.js';
import apiPost from '@/mixins/apiPost'

export default {
  name: '${ compoenntName }',
  components: {},
  mixins: [ openModal, apiPost ],
  data(){
    return {
      active,
      addUrl: this.GLOBAL.API_EXPRESS_COMPANY_SAVE,
      editUrl: this.GLOBAL.API_EXPRESS_COMPANY_UPDATE,
      infoUrl: this.GLOBAL.API_EXPRESS_COMPANY_DETAIL,
      addItem: {

      },
      //必填字段验证规则
      rules: {
        name: [ { required: true, message: '请填写名称', trigger: 'blur' } ],
        isActive: [ { required: true, message: ' ' } ],
      },
    }
  },
  computed: {},
  methods:{
    //打开模态框，判断编辑时候调用接口，动态设置保存接口
    openModal( id ){
      this.$refs.formItem.resetFields();
      this.isOpen = true;
      if (id) {
        this.title = '编辑';
        this.getDetail(id);
        this.saveUrl = this.editUrl;
      } else {
        this.title = '新增';
        this.saveUrl = this.addUrl;
      }
    },
    //保存前验证必填项
    infoSave(){
      this.$refs[ 'formItem' ].validate(( valid ) => {
        if (valid) {
          this.savePost();
        }
      });
    },
    //保存调用接口
    savePost(){
      this.isLoading = true;
      let callback = () => {
        this.isOpen = false;
        this.bus.$emit('kendoReflash');
      };
      this.postBack(this.saveUrl,this.addItem,callback);
      this.isLoading = false;
    },
    //编辑时获取详情
    getDetail( id ){
      let url = this.infoUrl + id;
      let callback = (res) => {
        this.addItem = res.data;
      };
      this.postBack(url,'',callback,0);
    }
  }
}
`
};

module.exports = {
  Init,
  Table,
  Modal
};
