import praw
import creds
import operator
credentials = creds.getCreds()
reddit = praw.Reddit(client_id=credentials['client_id'], client_secret=credentials['client_secret'],
                     password=credentials['password'], username= credentials['username'], user_agent=credentials['user_agent'])

sub = reddit.subreddit('askreddit')
'''
pop = reddit.subreddits.popular()
p_list = []

for p in pop:
    p_list.append(p)

l = {}

for x in p_list:
    sub = reddit.subreddit(x.display_name)
    l[x.display_name] = sub.subscribers
sorted_l = sorted(l.items(), key=operator.itemgetter(1) , reverse=True)
print(sorted_l)
'''

zs = reddit.subreddits.search(query='soccer')
for z in zs:
    print(z)


