import { Injectable } from '@angular/core';
import {
  BasicGazetteerInformation,
  BasicVillageInformation, FirstAvalabilityOrPurchase, LastName,
  NaturalDisaster, NaturalEnvironment, OneLevelResult, TableData,
  ThreeLevelResult, TwoLevelResult,
  Village,
  VillageSearchResult
} from './village-name.service';
import {HttpServiceService} from './http-service.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingleVillageSearchResultService {

  constructor(private httpService: HttpServiceService) { }

  // 使用promise all
  async searchEncap(choose: Village): Promise<VillageSearchResult> {

    const topics = [
      "village", "gazetteerinformation", "naturaldisasters", "naturalenvironment",
      "military", "education", "economy", "familyplanning", "population", "ethnicgroups",
      "fourthlastNames", "firstavailabilityorpurchase"];

    // 可以使用promise all --- const result = await Promise.all([].map(x=>this.httpService(x)))
    const result: TableData[] = []
    for(let x of topics) {

      let response = await this.httpService.post('ccvg/search',{"villageid":choose.id, "topic": x})
                                           .catch((err: HttpErrorResponse) => {
                                             // simple logging, but you can do a lot more, see below
                                             console.error('An error occurred:', err.error.text);
                                             return {data:[]};
                                           });
      result.push(<TableData> response);
    }
    console.log("result ",result);
    return {
      tables:[
        { // table1
          tableNameChinese: '村庄基本信息',
          columnsName: [
               {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: BasicVillageInformation) => `${row.gazetteerId}`},
               {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: BasicVillageInformation) => `${row.gazetteerName}`},
               {columnsHeaderChinese:'村庄代码',columnsDef:'villageId',cell: (row: BasicVillageInformation) => `${row.villageId}`},
               {columnsHeaderChinese:'村庄名字',columnsDef:'villageName',cell: (row: BasicVillageInformation) => `${row.villageName}`},
               {columnsHeaderChinese:'省',columnsDef:'province',cell: (row: BasicVillageInformation) => `${row.province}`},
               {columnsHeaderChinese:'市',columnsDef:'city',cell: (row: BasicVillageInformation) => `${row.city}`},
               {columnsHeaderChinese:'县',columnsDef:'county',cell: (row: BasicVillageInformation) => `${row.county}`},
               {columnsHeaderChinese:'分类',columnsDef:'category1',cell: (row: BasicVillageInformation) => `${row.category1}`},
               {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: BasicVillageInformation) => `${row.data}`},
               {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: BasicVillageInformation) => `${row.unit}`},
          ],
          field: ['gazetteerId','gazetteerName','villageId','villageName','province','city','county','category1','data','unit'],
          data: result[0].data,
          treeFilter:{},
        }, // end of table 1
        {  //table 2
            tableNameChinese: '村志基本信息',
            columnsName: [
              {columnsHeaderChinese:'村庄代码',columnsDef:'villageId',cell: (row: BasicGazetteerInformation) => `${row.villageId}`},
              {columnsHeaderChinese:'村庄名字',columnsDef:'villageName',cell: (row: BasicGazetteerInformation) => `${row.villageName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: BasicGazetteerInformation) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: BasicGazetteerInformation) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'出版年份',columnsDef:'publishYear',cell: (row: BasicGazetteerInformation) => `${row.publishYear}`},
              {columnsHeaderChinese:'出版类型',columnsDef:'publishType',cell: (row: BasicGazetteerInformation) => `${row.publishType}`},
            ],
            field: ['villageId', 'villageName', 'gazetteerId', 'gazetteerName', 'publishYear', 'publishType'],
            data: result[1].data,
            treeFilter: {}
          },  // end of table 2
        {   // table 3
            tableNameChinese: '自然灾害',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: NaturalDisaster) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: NaturalDisaster) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'年份',columnsDef:'year',cell: (row: NaturalDisaster) => `${row.year}`},
              {columnsHeaderChinese:'类别',columnsDef:'category1',cell: (row: NaturalDisaster) => `${row.category1}`},
            ],
            field: ['gazetteerName','gazetteerId','year','category1'],
            data: result[2].data,
            treeFilter: {
              风灾: null,
              水灾: null,
              虫害: null,
              龙卷风: null,
            }
            // filters2
          },   // end of table 3
        {
            tableNameChinese: '自然环境',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: NaturalEnvironment) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: NaturalEnvironment) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'类别',columnsDef:'category1',cell: (row: NaturalEnvironment) => `${row.category1}`},
              {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: NaturalEnvironment) => `${row.data}`},
              {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: NaturalEnvironment) => `${row.unit}`},
            ],
            field: ['gazetteerName','gazetteerId','category1','data','unit'],
            data: result[3].data,
            treeFilter:{}
          },
        {
            tableNameChinese: '军事政治',
            columnsName: [
               {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: TwoLevelResult) => `${row.gazetteerName}`},
               {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: TwoLevelResult) => `${row.gazetteerId}`},
               {columnsHeaderChinese:'类别1',columnsDef:'category1',cell: (row: TwoLevelResult) => `${row.category1}`},
               {columnsHeaderChinese:'类别2',columnsDef:'category2',cell: (row: TwoLevelResult) => `${row.category2}`},
               {columnsHeaderChinese:'开始年份',columnsDef:'startYear',cell: (row: TwoLevelResult) => `${row.startYear}`},
               {columnsHeaderChinese:'结束年份',columnsDef:'endYear',cell: (row: TwoLevelResult) => `${row.endYear}`},
               {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: TwoLevelResult) => `${row.data}`},
               {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: TwoLevelResult) => `${row.unit}`},
            ],
            field: ['gazetteerName','gazetteerId','category1','category2','startYear','endYear','data','unit'],
            data: result[4].data,
            treeFilter:{
              村民纠纷: null,
              共产党员: {
                男: null,
                女: null,
                总: null,
                少数民族: null,
              },
              阶级成分: {
                富农: null,
                贫下中农: null,
                中农: null,
                地主: null,
              },
              入伍: null,
              新党员: {
                男: null,
                女: null,
                总: null,
              },
              刑事案件: null,
            }
          },
        {
            tableNameChinese: '教育',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: ThreeLevelResult) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: ThreeLevelResult) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'类别1',columnsDef:'category1',cell: (row: ThreeLevelResult) => `${row.category1}`},
              {columnsHeaderChinese:'类别2',columnsDef:'category2',cell: (row: ThreeLevelResult) => `${row.category2}`},
              {columnsHeaderChinese:'类别3',columnsDef:'category3',cell: (row: ThreeLevelResult) => `${row.category3}`},
              {columnsHeaderChinese:'开始年份',columnsDef:'startYear',cell: (row: ThreeLevelResult) => `${row.startYear}`},
              {columnsHeaderChinese:'结束年份',columnsDef:'endYear',cell: (row: ThreeLevelResult) => `${row.endYear}`},
              {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: ThreeLevelResult) => `${row.data}`},
              {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: ThreeLevelResult) => `${row.unit}`},
            ],
            field: ['gazetteerName','gazetteerId','category1','category2','category3','startYear','endYear','data','unit'],
            data: result[5].data,
            treeFilter:{
              受教育程度:{
                文盲: null,
                小学: null,
                初中: null,
                中专高中: null,
                大专以上: null,
              },
              小学老师: null,
              小学在校生: null,
              '新入学生 - 大学': null,

            }
          },
        {
            tableNameChinese: '经济',
            columnsName: [
              {columnsHeaderChinese: '村志书名', columnsDef: 'gazetteerName', cell: (row: ThreeLevelResult) => `${row.gazetteerName}`},
              {columnsHeaderChinese: '村志代码', columnsDef: 'gazetteerId', cell: (row: ThreeLevelResult) => `${row.gazetteerId}`},
              {columnsHeaderChinese: '类别1', columnsDef: 'category1', cell: (row: ThreeLevelResult) => `${row.category1}`},
              {columnsHeaderChinese: '类别2', columnsDef: 'category2', cell: (row: ThreeLevelResult) => `${row.category2}`},
              {columnsHeaderChinese: '类别3', columnsDef: 'category3', cell: (row: ThreeLevelResult) => `${row.category3}`},
              {columnsHeaderChinese: '开始年份', columnsDef: 'startYear', cell: (row: ThreeLevelResult) => `${row.startYear}`},
              {columnsHeaderChinese: '结束年份', columnsDef: 'endYear', cell: (row: ThreeLevelResult) => `${row.endYear}`},
              {columnsHeaderChinese: '数据', columnsDef: 'data', cell: (row: ThreeLevelResult) => `${row.data}`},
              {columnsHeaderChinese: '单位', columnsDef: 'unit', cell: (row: ThreeLevelResult) => `${row.unit}`},
            ],
            field: ['gazetteerName', 'gazetteerId', 'category1', 'category2', 'category3', 'startYear', 'endYear', 'data', 'unit'],
            data: result[6].data,
            treeFilter: {
              电价: {
                General: null,
                农业: null,
                工业: null,
                商业: null,
                生活: {
                  全村: null,
                  每户: null,
                  每人: null,
                }
              },
              集体经济收入: {
                第一产业: null,
                第二产业: null,
                第三产业: {
                  商饮业: null,
                  服务业: null,
                },
                种植业: {
                  粮食: null,
                  水果: null,
                  蔬菜: null,
                },
                林业: null,
                牧业: null,
                副业: {
                  仓储业: null,
                  运输业: null,
                  建筑业: null,
                },
              },
              水价: {
                General: null,
                生活: null,
                农业: null,
                工业: null,
                商业: null,
              },
              用电量: {
                General: null,
                农业: null,
                工业: null,
                商业: null,
                生活: {
                  全村: null,
                  每户: null,
                  每人: null,
                }
              },
              用水量: {
                General: null,
                生活: null,
                农业: null,
                工业: null,
                商业: null,
              },
              总产值: {
                第一产业: null,
                第二产业: null,
                第三产业: {
                  商饮业: null,
                  服务业: null,
                },
                种植业: {
                  粮食: null,
                  水果: null,
                  蔬菜: null,
                },
                林业: null,
                牧业: null,
                副业: {
                  仓储业: null,
                  运输业: null,
                  建筑业: null,
                },
              },
              粮食总产量: null,
              人均居住面积: null,
              人均收入: null,
              耕地面积: null,
            },
          },
        {
            tableNameChinese: '计划生育',
            columnsName: [
                  {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: OneLevelResult) => `${row.gazetteerName}`},
                  {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: OneLevelResult) => `${row.gazetteerId}`},
                  {columnsHeaderChinese:'类别',columnsDef:'category1',cell: (row: OneLevelResult) => `${row.category1}`},
                  {columnsHeaderChinese:'开始年份',columnsDef:'startYear',cell: (row: OneLevelResult) => `${row.startYear}`},
                  {columnsHeaderChinese:'结束年份',columnsDef:'endYear',cell: (row: OneLevelResult) => `${row.endYear}`},
                  {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: OneLevelResult) => `${row.data}`},
                  {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: OneLevelResult) => `${row.unit}`},
                ],
            field: ['gazetteerName','gazetteerId','category1','startYear','endYear','data','unit'],
            data: result[7].data,
            treeFilter:{
              计划生育率: null,
              节育率: null,
              结扎总数: null,
              绝育手术: null,
              领取独生子女证人数: null,
              男性结扎: null,
              女性结扎: null,
              人工流产: null,
              上环: null,
              引产: null,
              育龄妇女人口: null,
            },
          },
        {
            tableNameChinese: '人口',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: TwoLevelResult) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: TwoLevelResult) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'类别1',columnsDef:'category1',cell: (row: TwoLevelResult) => `${row.category1}`},
              {columnsHeaderChinese:'类别2',columnsDef:'category2',cell: (row: TwoLevelResult) => `${row.category2}`},
              {columnsHeaderChinese:'开始年份',columnsDef:'startYear',cell: (row: TwoLevelResult) => `${row.startYear}`},
              {columnsHeaderChinese:'结束年份',columnsDef:'endYear',cell: (row: TwoLevelResult) => `${row.endYear}`},
              {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: TwoLevelResult) => `${row.data}`},
              {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: TwoLevelResult) => `${row.unit}`},
            ],
            field: ['gazetteerName','gazetteerId','category1','category2','startYear','endYear','data','unit'],
            data: result[8].data,
            treeFilter:{
              出生人数: null,
              户数: null,
              流动人口: null,
              '死亡率 Death Rate (%)': null,
              '死亡率 Death Rate (‰)': null,
              死亡人数: null,
              '自然出生率 Birth Rate (%)': null,
              '自然出生率 Birth Rate (‰)': null,
              '自然增长率 Natural Population Growth Rate (%)': null,
              '自然增长率 Natural Population Growth Rate (‰)': null,
              残疾人数: {
                精神残疾: null,
                听力语言残疾: null,
                肢体残疾: null,
                智力残疾: null,
                视力残疾: null,
                残疾人总数: null,
              },
              农转非:{
                人数: null,
                户数: null,
              },
              迁入:{
                人数: null,
                户数: null,
                知识青年: null,
              },
              迁出:{
                人数: null,
                户数: null,
                知识青年: null,
              },
              人口:{
                总人口: null,
                男性人口: null,
                女性人口: null,
              }


            }
          },
        {
            tableNameChinese: '民族',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: OneLevelResult) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: OneLevelResult) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'类别',columnsDef:'category1',cell: (row: OneLevelResult) => `${row.category1}`},
              {columnsHeaderChinese:'开始年份',columnsDef:'startYear',cell: (row: OneLevelResult) => `${row.startYear}`},
              {columnsHeaderChinese:'结束年份',columnsDef:'endYear',cell: (row: OneLevelResult) => `${row.endYear}`},
              {columnsHeaderChinese:'数据',columnsDef:'data',cell: (row: OneLevelResult) => `${row.data}`},
              {columnsHeaderChinese:'单位',columnsDef:'unit',cell: (row: OneLevelResult) => `${row.unit}`},
            ],
            field: ['gazetteerName','gazetteerId','category1','startYear','endYear','data','unit'],
            data: result[9].data,
            multiselectFilter: [ '汉族', '壮族', '回族', '满族', '维吾尔族', '苗族', '彝族', '土家族', '藏族',
              '蒙古族', '侗族', '布依族', '瑶族', '白族', '朝鲜族', '哈尼族', '黎族', '哈萨克族', '傣族', '畲族',
              '傈僳族', '东乡族', '仡佬族', '拉祜族', '佤族', '水族', '纳西族', '羌族', '土族', '仫佬族',
              '锡伯族', '柯尔克孜族', '景颇族', '达斡尔族', '撒拉族', '布朗族', '毛南族', '塔吉克族', '普米族', '阿昌族',
              '怒族', '鄂温克族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌兹别克族', '门巴族',
              '鄂伦春族', '独龙族', '赫哲族', '高山族', '珞巴族', '塔塔尔族', '少数民族 (总)' ],
          },
        {
            tableNameChinese: '姓氏',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: LastName) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: LastName) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'第一大姓',columnsDef:'firstLastNameId',cell: (row: LastName) => `${row.firstLastNameId}`},
              {columnsHeaderChinese:'第二大姓',columnsDef:'secondLastNameId',cell: (row: LastName) => `${row.secondLastNameId}`},
              {columnsHeaderChinese:'第三大姓',columnsDef:'thirdLastNameId',cell: (row: LastName) => `${row.thirdLastNameId}`},
              {columnsHeaderChinese:'第四大姓',columnsDef:'fourthLastNameId',cell: (row: LastName) => `${row.fourthLastNameId}`},
              {columnsHeaderChinese:'第五大姓',columnsDef:'fifthLastNameId',cell: (row: LastName) => `${row.fifthLastNameId}`},
              {columnsHeaderChinese:'姓氏总数',columnsDef:'totalNumberOfLastNameInVillage',cell: (row: LastName) => `${row.totalNumberOfLastNameInVillage}`},
            ],
            field: ['gazetteerName','gazetteerId','firstLastNameId','secondLastNameId','thirdLastNameId','fourthLastNameId','fifthLastNameId','totalNumberOfLastNameInVillage'],
            data: result[10].data,
            lastnameFilter:['杨', '邓', '叶', '赵', '孙'],
          },
        {
            tableNameChinese: '第一次购买或拥有年份',
            columnsName: [
              {columnsHeaderChinese:'村志书名',columnsDef:'gazetteerName',cell: (row: FirstAvalabilityOrPurchase) => `${row.gazetteerName}`},
              {columnsHeaderChinese:'村志代码',columnsDef:'gazetteerId', cell: (row: FirstAvalabilityOrPurchase) => `${row.gazetteerId}`},
              {columnsHeaderChinese:'类别',columnsDef:'category',cell: (row: FirstAvalabilityOrPurchase) => `${row.category1}`},
              {columnsHeaderChinese:'年份',columnsDef:'year',cell: (row: FirstAvalabilityOrPurchase) => `${row.year}`},
            ],
            field: ['gazetteerName','gazetteerId','category','year'],
            data:result[11].data,
            treeFilter:{
              液化气: null,
              天然气: null,
              管道燃气: null,
              自来水: null,
              供电: null,
              电话机: null,
              有线广播: null,
            },
          }
      ],
    }
  }


}

