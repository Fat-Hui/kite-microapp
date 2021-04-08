# 上应小风筝

上应小风筝，这里的校园很棒！

## 背景和简况

校园中总是遇到各种各样的事儿，如物品遗失、求购二手书、问题咨询……之后，有了各种“表白墙”、“万能墙”。你可能会发现，这样解决问题的方式效率不高，有些问题甚至让人啼笑皆非。你也会看到，每年有很多人申报大学生创新项目，就是为了解决可能的、你所遇到的这些问题，不过结局通常是“烂尾”，它们没有很好地与校园实际结合起来，或者功能存在缺憾，也有的至今未完成初稿。

令我印象最深的是已经毕业的一位学长开发的 [SITschool](https://github.com/IMAlex233/SITschool)，设计思路是在移动端上直接抓取校内网页并解析，最终呈现给用户。这是我见到的较为完整的一个项目了。校信息办也一直委托本地一家公司为学校开发移动端软件，不提也罢。而其他学校类似平台给了我们别样的惊喜，如上海交通大学的“交大柠檬”，便是一款功能丰富又实用的项目。这也成为了我们的目标之一。

我们认为，脱离了大流量入口又没有特色功能的应用很难活得长久。有了其他项目的前车之鉴，我们决定要做一个能用、好用的项目，同时也要保证项目的公益性。项目团队成员多为计算机专业，我们希望能将“虚无缥缈”的《软件工程》付诸实践，做出一款令我们自己自豪、令同学满意的产品。

项目团队由校易班工作站技术部组建，依托校易班工作站的资源建立，并在全校本、研究生中招募成员加入。其实，在 2019 年年底时，我们就关于它有过一些讨论，并在 2020 年寒假开始行动。团队在开发过程中踩过不少坑，遇到了设计、工具使用、团队上的种种困难，发布时间也一拖再拖。设计和开发过程中，也综合考虑了实际运营情况，所属机构、校内各部门的要求，以及对项目未来传承和规划，深感不易。如今产品面世，衷心地感谢每一位一直以来支持我们、支持这个项目的人。

未来，我们希望能够不断地完善“上应小风筝”的功能，坚持其公益性属性，更好地服务全校师生。同时，会将部分工具类功能开放成平台，无偿供校内同学开发属于自己的应用。如果您有需要，可以联系我们。

## 架构

从开发人员的角度来看，项目主要分为前端（小程序端，即本项目）、后端（服务端）、爬虫节点和运维工具（暂未开源）。

项目使用单台云主机，称为 kite-server，为其他服务提供 API 接口，并保持与校内代理节点（kite-agent）的通信，随时拉取校内平台数据。小程序、移动端App调用 API 只需接口。

有关项目见 [这里](#有关项目)。

## 关于我们

> 你是否想体验一次学生记者的感觉？
>
> 你是否渴望在镜头前露面，表达自己出色的一面！
> 
> 你是否计划手持一只单反，锻炼自己的摄影技巧？
> 
> 你是否期待自己举办一次声势浩大的晚会！
> 
> 快加入我们吧！

**上海应用技术大学**校易班学生工作站有八个常设部门，包括活动策划部、宣传部、编辑部、人力资源部、站务部、记者团、网课部和技术部。站长团具体负责工作站日常事务，各部门协同配合举办各类易班主题和校级重要活动。

## 联系我们

1. 在本项目中[提交 issue](https://github.com/SIT-Yiban/kite-microapp/issues) 
2. 在 QQ 群中联系管理员反馈。2020级易班新生群：[962202486](https://jq.qq.com/?_wv=1027&k=Zyokh4KP)
3. 地址：奉贤校区大学生活动中心309室

## 贡献者

贡献者包括 [有关项目](#有关项目) 中提到的所有项目贡献者。

**素材设计**

- 2017级 外国语学院 张城

**方案沟通**

- 2017级 生态技术与工程学院 sascx

**程序设计与编写**

- 2018级 材料科学与工程学院 [rainslide](https://github.com/Crystal-RainSlide)
- 2019级 化学与环境工程学院 [wzh](https://github.com/OneofFive-ops)
- 2018级 计算机科学与信息工程学院 [alenying](https://github.com/AlenYing)
- 2017级 计算机科学与信息工程学院 [peanut996](https://github.com/peanut996/)
- 2018级 计算机科学与信息工程学院 [sunnysab](https://sunnysab.cn)
- 2018级 计算机科学与信息工程学院 [wanfengcxz](https://github.com/wanfengcxz)
- 2017级 理学院 [snowstar cyan](https://github.com/snomiao)

（按学院、昵称排序）

在功能和细节设计时，也有很多朋友与同学给予了我们肯定，并提出许多宝贵的意见和建议，在此一并表示感谢。


## 参与贡献

在每年招新期间，你可以关注一下“上海应用技术大学易班”公众号，或有关QQ群了解招新信息加入校易班工作站（欢迎来技术部！）。

你也可以直接对有关项目提交 issue 或 pull request，留下你的痕迹。

## 有关项目

| 项目         | 说明             |
| ------------ | ---------------- |
| [kite-server](https://github.com/SIT-Yiban/kite-server) | 后端API服务 |
| [kite-agent](https://github.com/sunnysab/kite-agent) | 后端数据抓取工具 |
| [kite-string](https://github.com/SIT-Yiban/kite-string) | 校园网爬虫工具 |

部分项目已在 Gitee 上进行镜像，访问速度会快一些。


## 开源许可

项目中的代码（程序源代码、配置文件等）采用 [GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) 协议发布。**注意**，如果您修改并分发本项目，您应当同意，软件的“分发“或”发布“包括”为用户提供服务“。您修改并分发项目后，应当对用户和我们（即，上海应用技术大学校易班工作站）公开全部源代码。除此之外，您（非贡献者）也不能将本项目用于比赛、论文等活动。

我们反对抄袭、混奖状、骗项目经费等学术不端行为，未来几年内我们团队时间充裕，不怕打官司。

项目名称、标语、标志性图片等素材，仅限上海应用技术大学校易班工作站及原作者使用，或经其书面同意后使用，不对外授权。

