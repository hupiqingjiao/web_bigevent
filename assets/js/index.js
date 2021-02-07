$(function() {

    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1 清空本地存储中的token
            localStorage.removeItem('token')
                // 2 重新跳转到登录页面
            location.href = '/login.html'

            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) { return layui.layer.msg('获取用户信息失败!') }
            // 调用rederAvatar()渲染用户头像
            rederAvatar(res.data)
        },
        // 不论访问成功或者失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}
// 渲染用户头像
function rederAvatar(user) {
    // 获取用户名称
    var name = user.nikname || user.username
        // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name)
        // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}