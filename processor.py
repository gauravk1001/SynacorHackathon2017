import praw
import creds
import collections
import operator
credentials = creds.getCreds()

reddit = praw.Reddit(client_id=credentials['client_id'], client_secret=credentials['client_secret'],
    password=credentials['password'], username= credentials['username'], user_agent=credentials['user_agent'])

def getSubreddits(search_query):
    """
    Retrieve dict of subreddits relevent to the search_query ordered by number of subscribers.
    :param search_query:
    :return: dict
    """
    results = {}
    if search_query:
        results_listing_generator = reddit.subreddits.search_by_topic(query=search_query)

    for item in results_listing_generator:
        results[item.display_name] = getSubscribers(item.display_name)

    return results

def getSubscribers(subreddit):
    """
    Retrieve number of subscribers for a specific subreddit.
    :param subreddit:
    :return: number
    """
    number_of_subscribers = 0
    if subreddit:
        number_of_subscribers = reddit.subreddit(subreddit).subscribers
    return number_of_subscribers

def sortBySubscribers(subreddits):
    """
    Return the dict of subreddits in descending order of the subscribers.
    :param subreddits:
    :return: dict(key=subreddit , value=subscribers)
    """
    sorted_subreddits = {}
    if subreddits:
        sorted_subreddits = sorted(subreddits.items(), key=operator.itemgetter(1))
    return sorted_subreddits

if __name__ == "__main__":
    search_query = 'soccer'
    results = sortBySubscribers(getSubreddits(search_query))
    print(results)