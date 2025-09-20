import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Cat {
  id: number
  name: string
  image: string
  age: string
  personality: string[]
  color: string
  breed: string
}

const cats: Cat[] = [
  {
    id: 1,
    name: "Мурзик",
    image: "/img/d72d2a5f-71c5-48d3-a7ec-502ebd39280b.jpg",
    age: "2 года",
    personality: ["игривый", "ласковый", "умный"],
    color: "полосатый",
    breed: "домашний"
  },
  {
    id: 2,
    name: "Рыжик",
    image: "/img/b6ee9ecc-053e-482a-9784-21d2c1d8eed2.jpg",
    age: "4 года",
    personality: ["спокойный", "величественный", "независимый"],
    color: "рыжий",
    breed: "персидский"
  },
  {
    id: 3,
    name: "Барсик",
    image: "/img/57d4125e-b03c-4473-834a-6771c81f4395.jpg",
    age: "6 месяцев",
    personality: ["энергичный", "любопытный", "озорной"],
    color: "черно-белый",
    breed: "домашний"
  },
  {
    id: 4,
    name: "Соня",
    image: "/img/d72d2a5f-71c5-48d3-a7ec-502ebd39280b.jpg",
    age: "3 года",
    personality: ["спокойная", "ласковая", "сонная"],
    color: "серый",
    breed: "британский"
  },
  {
    id: 5,
    name: "Пушок",
    image: "/img/b6ee9ecc-053e-482a-9784-21d2c1d8eed2.jpg",
    age: "1 год",
    personality: ["дружелюбный", "активный", "веселый"],
    color: "белый",
    breed: "мейн-кун"
  },
  {
    id: 6,
    name: "Маруся",
    image: "/img/57d4125e-b03c-4473-834a-6771c81f4395.jpg",
    age: "5 лет",
    personality: ["грациозная", "элегантная", "гордая"],
    color: "черный",
    breed: "сиамский"
  }
]

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPersonality, setSelectedPersonality] = useState('')

  const filteredCats = cats.filter(cat => {
    const matchesName = cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPersonality = selectedPersonality === '' || cat.personality.includes(selectedPersonality)
    const matchesColor = cat.color.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBreed = cat.breed.toLowerCase().includes(searchQuery.toLowerCase())
    
    return (matchesName || matchesColor || matchesBreed) && matchesPersonality
  })

  const personalities = Array.from(new Set(cats.flatMap(cat => cat.personality)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-coral via-background to-accent/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🐱</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary tracking-wider">КОТОГАЛЕРЕЯ</h1>
                <p className="text-muted-foreground text-sm">Коллекция самых милых котиков</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" className="rounded-full">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Button className="rounded-full bg-primary hover:bg-primary/90">
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Галерея
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, цвету или породе..."
                className="pl-10 rounded-full border-primary/20 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-full border border-primary/20 focus:border-primary bg-white min-w-[200px]"
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(e.target.value)}
            >
              <option value="">Все характеры</option>
              {personalities.map(personality => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Найдено котиков: {filteredCats.length}
          </h2>
          <p className="text-muted-foreground">
            Каждый котик особенный и ждет своего человека! 🐾
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCats.map((cat) => (
            <Card key={cat.id} className="group overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={16} className="text-primary" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
                  <Badge variant="secondary" className="bg-accent/50 text-accent-foreground rounded-full">
                    {cat.age}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Palette" size={14} />
                    <span className="capitalize">{cat.color}</span>
                    <span>•</span>
                    <span className="capitalize">{cat.breed}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.personality.map((trait) => (
                      <Badge
                        key={trait}
                        variant="outline"
                        className="rounded-full border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full mt-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCats.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😿</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Котиков не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-primary/10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🐾</span>
            <span className="text-lg font-medium text-foreground">Сделано с любовью к котикам</span>
            <span className="text-2xl">🐾</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Котогалерея. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  )
}