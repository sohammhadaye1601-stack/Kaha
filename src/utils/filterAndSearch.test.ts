import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProducts,
  groupProductsBySeries,
  filterInstallations,
  filterBlogs,
  cleanPhoneForTel,
  getStatusBadgeStyle
} from './filterAndSearch';
import { Product, InstallationProject, BlogPost } from '../types';

const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: 'HS Pro Iso-Lateral Chest Press',
    seriesId: 'hs-pro',
    seriesName: 'HS Pro Series',
    category: 'strength',
    description: 'Converging chest press',
    imageUrl: '/test.jpg',
    specifications: { steelGauge: '3mm' },
    features: ['Converging motion', 'Independent arms'],
    customOptions: ['25 Frame Colors'],
    published: true
  },
  {
    id: 'p2',
    name: 'Into Air Bike Commercial',
    seriesId: 'cardio',
    seriesName: 'Cardio Series',
    category: 'cardio',
    description: 'Heavy duty fan bike',
    imageUrl: '/test2.jpg',
    specifications: { driveSystem: 'Belt drive' },
    features: ['LCD console', 'Wind fan'],
    customOptions: ['Standard'],
    published: true
  },
  {
    id: 'p3',
    name: 'Draft Unpublished Machine',
    seriesId: 'hs-pro',
    seriesName: 'HS Pro Series',
    category: 'strength',
    description: 'Draft',
    imageUrl: '/test3.jpg',
    specifications: {},
    features: [],
    customOptions: [],
    published: false
  }
];

test('filterProducts returns only published products', () => {
  const res = filterProducts(sampleProducts, '', 'all', 'all');
  assert.equal(res.length, 2);
  assert.equal(res.some((p) => p.id === 'p3'), false);
});

test('filterProducts filters by category correctly', () => {
  const cardioOnly = filterProducts(sampleProducts, '', 'cardio', 'all');
  assert.equal(cardioOnly.length, 1);
  assert.equal(cardioOnly[0].id, 'p2');
});

test('filterProducts filters by series ID', () => {
  const hsProOnly = filterProducts(sampleProducts, '', 'all', 'hs-pro');
  assert.equal(hsProOnly.length, 1);
  assert.equal(hsProOnly[0].id, 'p1');
});

test('filterProducts searches across names, series and features', () => {
  const searchAir = filterProducts(sampleProducts, 'fan bike', 'all', 'all');
  assert.equal(searchAir.length, 1);
  assert.equal(searchAir[0].id, 'p2');

  const searchConverging = filterProducts(sampleProducts, 'converging', 'all', 'all');
  assert.equal(searchConverging.length, 1);
  assert.equal(searchConverging[0].id, 'p1');
});

test('groupProductsBySeries groups products into dictionary', () => {
  const grouped = groupProductsBySeries(sampleProducts);
  assert.ok(grouped['HS Pro Series']);
  assert.equal(grouped['HS Pro Series'].length, 2);
  assert.ok(grouped['Cardio Series']);
  assert.equal(grouped['Cardio Series'].length, 1);
});

test('filterInstallations filters by category and published state', () => {
  const sampleInst: InstallationProject[] = [
    {
      id: 'i1',
      name: 'Forge Hub',
      location: 'Pune',
      category: 'Commercial Gym',
      completionDate: '2024',
      description: 'Outfitting',
      imageUrl: '/img.jpg',
      equipmentCount: 40,
      highlightSeries: ['HS Pro'],
      published: true
    },
    {
      id: 'i2',
      name: 'Armed Forces Center',
      location: 'Pune',
      category: 'Defence / Forces',
      completionDate: '2023',
      description: 'Tactical gym',
      imageUrl: '/img2.jpg',
      equipmentCount: 50,
      highlightSeries: ['HS Series'],
      published: true
    },
    {
      id: 'i3',
      name: 'Hidden Project',
      location: 'Mumbai',
      category: 'Commercial Gym',
      completionDate: '2024',
      description: 'Secret',
      imageUrl: '/img3.jpg',
      equipmentCount: 10,
      highlightSeries: [],
      published: false
    }
  ];

  const commercial = filterInstallations(sampleInst, 'Commercial Gym');
  assert.equal(commercial.length, 1);
  assert.equal(commercial[0].name, 'Forge Hub');

  const all = filterInstallations(sampleInst, 'all');
  assert.equal(all.length, 2);
});

test('cleanPhoneForTel preserves only digits and plus sign', () => {
  const cleaned = cleanPhoneForTel('+91-7420925709');
  assert.equal(cleaned, '+917420925709');
  const cleaned2 = cleanPhoneForTel('+91 (866) 969-7799');
  assert.equal(cleaned2, '+918669697799');
});

test('getStatusBadgeStyle returns styles for all valid statuses', () => {
  assert.equal(getStatusBadgeStyle('New').bg, 'bg-red-50');
  assert.equal(getStatusBadgeStyle('In Review').bg, 'bg-amber-50');
  assert.equal(getStatusBadgeStyle('Contacted').bg, 'bg-blue-50');
  assert.equal(getStatusBadgeStyle('Closed').bg, 'bg-emerald-50');
});
