from pprint import pprint
import requests
import json

def do_something():
    # Get stuff from a user
    # username = ''
    # u_property = 'overview'
    # user_data = requests.get(r'http://www.reddit.com/user/' + username + '/' + u_property + '/.json')
    #
    # data = json.loads(user_data.text)
    # print('User:', username , '\nData:', property, '\n\n')
    # print(json.dumps(data['data']['children'][0:2], indent=4, sort_keys=True))

    # Get stuff from a sub
    subreddit = 'askreddit'
    s_property = 'hot'
    sub_data = requests.get(r'http://www.reddit.com/r/' + subreddit + '/' + s_property + '/.json')

    data = json.loads(sub_data.text)
    print('Sub:', subreddit , '\nData:', s_property, '\n\n')
    print(json.dumps(data['data']['children'][0:2], indent=4, sort_keys=True))
    print('length of this thing:', len(data['data']['children']))

    # Print something
    for post in data['data']['children'][0:2]:
        print('post: ', json.dumps(post, indent=4, sort_keys=True))

if __name__ == '__main__':
    do_something()
