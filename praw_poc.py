import praw
import creds
credentials = creds.getCreds()
reddit = praw.Reddit(client_id=credentials['client_id'], client_secret=credentials['client_secret'],
                     password=credentials['password'], username= credentials['username'], user_agent=credentials['user_agent'])

#for submission in reddit.subreddit('askreddit').hot(limit=5):
#    print(submission.title + " " + str(submission.score))

#print(reddit.subreddit('askreddit').subscribers)
sub = reddit.subreddit('askreddit')

print(sub.subscribers)
