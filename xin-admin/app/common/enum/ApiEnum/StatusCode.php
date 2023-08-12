<?php
namespace app\common\enum\ApiEnum;

enum StatusCode: int {

    // 请求已成功，请求所希望的响应头或数据体将随此响应返回。出现此状态码是表示正常状态。
	case OK = 200;

    // 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随Location 头信息返回。假如需要的资源无法及时建立的话，应当返回 '202 Accepted'。
    case CREATED = 201;

    // 服务器已接受请求，但尚未处理。正如它可能被拒绝一样，最终该请求可能会也可能不会被执行。在异步操作的场合下，没有比发送这个状态码更方便的做法了。
    case ACCEPTED = 202;
    
}
