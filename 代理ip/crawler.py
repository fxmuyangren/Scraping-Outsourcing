import requests
import re
from lxml import etree

def get_proxy():
    url = ('http://www.xiladaili.com/gaoni/{page}/').format(page='')
    for i in range(1,100):
        response = requests.get(url=url.format(i))
        res_html = etree.HTML(response.text)

        ip_list = (res_html.xpath('//tbody/tr/td[1]/text()'))
        for proxy in ip_list:
            yield proxy


def check_proxy(proxy):
    # proxy = '62.75.215.25:5836'
    proxies = {
        'http': 'http://' + proxy,
        'https': 'https://' + proxy,
    }
    try:
        response = requests.get('http://47.52.131.92/ip.php', proxies = proxies, timeout=1, verify=False)
        return True if int(response.status_code) == 200 else False
    except requests.ConnectionError:
        # print('Error', e.args)
        return False

if __name__ == '__main__':
    proxy_lis = list()
    proxys = get_proxy()
    for proxy in proxys:
        proxy_lis.append(proxy)
    for proxy in proxy_lis:
        res = check_proxy(proxy)
        print(proxy)
        print(res)
        print('==='*30)
        if not res:
            proxy_lis.remove(proxy)