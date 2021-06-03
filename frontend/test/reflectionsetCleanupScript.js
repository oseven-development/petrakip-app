const x = require('./reflectionset.json')
const util = require('util')
// interface TopicItem {
//   topicItemId: string
//   topicItemLable: string
//   topicItemDescribe: string
//   subListItems: SubTopicItem[]
// }

// export interface SubTopicItem {
//   subTopicItemId: string
//   subjectLable: string
//   subjectStatusCompleted: boolean
// }

const data = x.Categories.map(item => ({
  topicItemLable: item.Name,
  topicItemId: item.Name.split(' ').join('-').toLocaleLowerCase(),
  topicItemDescribe: item.Description,
  subListItems: item.Topics.map(subItem => ({
    subTopicItemId: subItem.Name.split(' ').join('-').toLocaleLowerCase(),
    subjectLable: subItem.Name,
    subjectStatusCompleted: Math.random() > 0.5 ? true : false,
  })),
}))

console.log(util.inspect(data, false, null, true /* enable colors */))
