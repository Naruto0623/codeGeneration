const Init = compoenntName => {
  return `<style lang="less" scoped>
  @import "./${ compoenntName }.less";
</style>
<template>
  <div class="${ compoenntName }">
    这是${ compoenntName }组件
  </div>
</template>
<script src="./${ compoenntName }.js"></script>
`
};

const Table = compoenntName => {
  return `<style lang="less" scoped>
  @import "./${ compoenntName }.less";
</style>
<template>
  <div class="${ compoenntName }">
    这是${ compoenntName }列表页面
    <public-button ref="pButton"
                   :selectIds="selectIds"
                   :kendoSelectList="selectItem"
                   :isChildren="kendoProps.isChildren || 0 "
                   :objectType="kendoParams.objectType">
    </public-button>
    <kendo-table ref='kendoChild'
                 @saveSelect="selectData"
                 :kendoParams="kendoParams"
                 :kendoProps="kendoProps"
                 :kendoFilters="kendoFilters">
    </kendo-table>
  </div>
</template>
<script src="./${ compoenntName }.js"></script>
`
};

const Modal = compoenntName => {
  return `<template>
  <div class="${ compoenntName }">
    <Modal v-model="isOpen" width="50%">
      <p slot="header">{{title}}</p>
      <Row>
        这是${ compoenntName }模态框
        <Form :model="addItem" :label-width="120" :rules="rules" ref="formItem">
          <Col span="11">
            <FormItem label="名称" prop="name">
              <Input size="small" v-model.trim="addItem.name" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="11" style="height: 42px;">
            <FormItem label="状态" prop="isActive">
              <Select size="small" v-model="addItem.isActive" placeholder="请输选择状态">
                <Option v-for="(item,index) in active" :value="item.key" :key="index">{{ item.value }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <div slot="footer">
        <Button type="dashed" size="small" @click="cancelModal">取消</Button>
        <Button type="primary" size="small" :loading="isLoading" @click="infoSave">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./${ compoenntName }.js"></script>
`
};

module.exports = {
  Init,
  Table,
  Modal
};
