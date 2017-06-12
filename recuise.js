function recursive(i) {
    var sum = 0;
    if (0 == i)
        return (1);
    else
        sum = i * recursive(i - 1);
    return sum;
}
recursive(3);
console.log(recursive(3));

//斐波那契 n为月数
function Fib(n) {
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    if (n > 1)
        return Fib(n - 1) + Fib(n - 2);
}
console.log(Fib(1));
console.log(Fib(4));


function buildMenuTree(menuArr) {
    var $menuContainer = $("<div class='xs-treeView'>");
    var $treeNode, $treeHead, itemTitle, target;
    for (var idx = 0, len = menuArr.length; idx < len; idx++) {
        itemTitle = menuArr[idx].title;
        $treeNode = $("<div class='xs-treeNode'></div>").appendTo(
            $menuContainer);

        target = menuArr[idx].target;
        if (target.indexOf(".sraction") > -1 && menuArr[idx].children.length === 0) {
            $treeHead = $(
                "<div class='xs-treehead' id='xs-menu_" + menuArr[idx].menuCode + "'url='" + target + "'><p>" + itemTitle + "</p></div>").appendTo(
                $treeNode);
        } else if (menuArr[idx].parent === "userConfiguration") {
            $treeHead = $(
                "<div class='xs-treehead' id='xs-menu_" + menuArr[idx].menuCode + "'><p>" + itemTitle + "</p></div>").appendTo($treeNode);
        } else {
            $treeHead = $(
                    "<div class='xs-treehead'><p>" + itemTitle + "</p></div>")
                .appendTo($treeNode);
        }

        if (0 !== menuArr[idx].children.length) {
            buildMenuTree(menuArr[idx].children).appendTo($treeNode);
        } else {
            $treeNode.addClass('no-subfield');
        }
    }
    return $menuContainer;
}
