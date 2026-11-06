import feedparser
import json
import time
from bs4 import BeautifulSoup

# Liste des 10 blogs avec leurs thèmes associés
blogs = [
    {"url": "https://thematiquesdejean.blogspot.com/feeds/posts/default?alt=rss", "theme": "Thématiques de Jean"},
    {"url": "https://thematiquesdejean1.blogspot.com/feeds/posts/default?alt=rss", "theme": "Thématiques de Jean 1"},
    {"url": "https://lessonsfoilivrejosue.blogspot.com/feeds/posts/default?alt=rss", "theme": "Leçons de foi - Josué"},
    {"url": "https://evangiledemarc2024t3.blogspot.com/feeds/posts/default?alt=rss", "theme": "Évangile de Marc"},
    {"url": "https://amour-et-justice-de-dieu.blogspot.com/feeds/posts/default?alt=rss", "theme": "Amour et Justice de Dieu"},
    {"url": "https://exodeverslaterrepromise.blogspot.com/feeds/posts/default?alt=rss", "theme": "Exode vers la Terre Promise"},
    {"url": "https://allusionsimagessymboles.blogspot.com/feeds/posts/default?alt=rss", "theme": "Allusions, images et symboles"},
    {"url": "https://unircielterre.blogspot.com/feeds/posts/default?alt=rss", "theme": "Unir Ciel et Terre"},
    {"url": "https://grandirrelationavecdieu.blogspot.com/feeds/posts/default?alt=rss", "theme": "Grandir avec Dieu"},
    {"url": "https://1et2epitresdepaul2corinthe.blogspot.com/feeds/posts/default?alt=rss", "theme": "Épîtres aux Corinthiens"}
]

all_articles = []
article_id = 1

print("Début de l'extraction complète...")

for blog in blogs:
    blog_url = blog["url"]
    theme_name = blog["theme"]
    print(f"Extraction de : {blog_url.split('/')[2]}")
    
    try:
        feed = feedparser.parse(blog_url)
        
        if not feed.entries:
            feed = feedparser.parse(blog_url.replace('?alt=rss', ''))
        
        for entry in feed.entries:
            # Nettoyage du HTML
            raw_content = entry.content[0].value if hasattr(entry, 'content') else entry.summary
            soup = BeautifulSoup(raw_content, "html.parser")
            clean_content = soup.get_text(separator="\n")
            
            # On utilise entry.title s'il existe, sinon on prend le début du contenu
            title = entry.title if entry.title else clean_content.split('\n')[0][:50] + "..."
            
            raw_summary = entry.summary
            soup_summary = BeautifulSoup(raw_summary, "html.parser")
            clean_summary = soup_summary.get_text()[:200] + "..."
            
            series_name = blog_url.split('/')[2].replace('.blogspot.com', '')
            
            # On met un thème basé sur le blog
            quarter = "T4 2024"
            if "2025" in entry.published:
                quarter = "T1 2025"
            
            article = {
                "id": str(article_id),
                "title": title,
                "content": clean_content,
                "excerpt": clean_summary,
                "date": entry.published,
                "theme": theme_name, # <-- Le thème est maintenant correct
                "series": series_name,
                "quarter": quarter,
                "blogSource": blog_url.split('/')[2]
            }
            all_articles.append(article)
            article_id += 1
            
        print(f"   -> {len(feed.entries)} articles trouvés.")
    except Exception as e:
        print(f"   -> Erreur : {e}")
    time.sleep(1)

with open('app/lib/articles_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_articles, f, ensure_ascii=False, indent=2)

print(f"\nExtraction terminée ! {len(all_articles)} articles sauvegardés.")