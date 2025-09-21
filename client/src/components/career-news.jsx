import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search, Clock, TrendingUp, Briefcase, BookOpen, Users } from "lucide-react"

// TODO: Remove mock data
const newsCategories = [
  { id: 'all', name: 'All News', icon: TrendingUp },
  { id: 'tech', name: 'Technology', icon: BookOpen },
  { id: 'jobs', name: 'Job Market', icon: Briefcase },
  { id: 'skills', name: 'Skills', icon: Users },
]

const newsArticles = [
  {
    id: 1,
    title: "AI and Machine Learning Skills in High Demand for 2024",
    excerpt: "Companies are actively seeking professionals with AI/ML expertise as automation becomes crucial for competitive advantage.",
    category: "tech",
    source: "TechCrunch",
    publishDate: "2024-01-10",
    readTime: "4 min read",
    tags: ["AI", "Machine Learning", "Career Growth"],
    url: "#",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"
  },
  {
    id: 2,
    title: "Remote Work Trends: How to Stand Out in Virtual Interviews",
    excerpt: "Master the art of virtual interviews with these proven strategies that helped 500+ candidates land their dream remote jobs.",
    category: "jobs",
    source: "Harvard Business Review",
    publishDate: "2024-01-08",
    readTime: "6 min read",
    tags: ["Remote Work", "Interviews", "Career Tips"],
    url: "#",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
  },
  {
    id: 3,
    title: "Top Programming Languages to Learn in 2024",
    excerpt: "Based on industry surveys and job postings, these programming languages offer the best career prospects this year.",
    category: "skills",
    source: "Stack Overflow",
    publishDate: "2024-01-05",
    readTime: "5 min read",
    tags: ["Programming", "Skills Development", "Career Planning"],
    url: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
  },
  {
    id: 4,
    title: "Startup Ecosystem Sees Record Hiring in Tech Roles",
    excerpt: "Despite economic uncertainties, startups continue to expand their tech teams, creating opportunities for fresh graduates.",
    category: "jobs",
    source: "VentureBeat",
    publishDate: "2024-01-03",
    readTime: "3 min read",
    tags: ["Startups", "Hiring", "Tech Jobs"],
    url: "#",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400"
  },
  {
    id: 5,
    title: "Cloud Computing Certifications That Actually Matter",
    excerpt: "Industry experts reveal which cloud certifications provide the best ROI and career advancement opportunities.",
    category: "skills",
    source: "InfoWorld",
    publishDate: "2024-01-01",
    readTime: "7 min read",
    tags: ["Cloud Computing", "Certifications", "AWS", "Azure"],
    url: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
  },
  {
    id: 6,
    title: "The Rise of DevOps Engineers: Salary Trends and Skills Required",
    excerpt: "DevOps roles continue to command premium salaries. Learn what skills you need to transition into this high-demand field.",
    category: "tech",
    source: "The New Stack",
    publishDate: "2023-12-28",
    readTime: "8 min read",
    tags: ["DevOps", "Salary", "Career Transition"],
    url: "#",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400"
  },
]

export function CareerNews() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = newsArticles.filter(article => {
    const categoryMatch = selectedCategory === "all" || article.category === selectedCategory
    const searchMatch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return categoryMatch && searchMatch
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6" data-testid="career-news">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Career News</h2>
          <p className="text-muted-foreground">Stay updated with industry trends and career insights</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-news"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {newsCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            data-testid={`button-category-${category.id}`}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover-elevate group" data-testid={`news-card-${article.id}`}>
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {newsCategories.find(cat => cat.id === article.category)?.name || article.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {article.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">{article.source}</span>
                    <span className="mx-1">•</span>
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => console.log(`Reading article ${article.id}`)}
                  data-testid={`button-read-${article.id}`}
                >
                  Read Article
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filters
            </p>
            <div className="flex justify-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
                disabled={searchTerm === ""}
              >
                Clear Search
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory("all")}
                disabled={selectedCategory === "all"}
              >
                Show All Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => console.log('Loading more articles')}
            data-testid="button-load-more"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}