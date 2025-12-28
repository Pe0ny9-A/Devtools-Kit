import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/api-tester',
    name: 'ApiTester',
    component: () => import('@/views/ApiTester/index.vue'),
  },
  {
    path: '/sql-builder',
    name: 'SqlBuilder',
    component: () => import('@/views/SqlBuilder/index.vue'),
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: () => import('@/views/FormBuilder/index.vue'),
  },
  {
    path: '/markdown-editor',
    name: 'MarkdownEditor',
    component: () => import('@/views/MarkdownEditor/index.vue'),
  },
  {
    path: '/regex-tester',
    name: 'RegexTester',
    component: () => import('@/views/RegexTester/index.vue'),
  },
  {
    path: '/json-converter',
    name: 'JsonConverter',
    component: () => import('@/views/JsonConverter/index.vue'),
  },
  {
    path: '/encoder',
    name: 'Encoder',
    component: () => import('@/views/Encoder/index.vue'),
  },
  {
    path: '/timestamp',
    name: 'Timestamp',
    component: () => import('@/views/Timestamp/index.vue'),
  },
  {
    path: '/uuid-generator',
    name: 'UuidGenerator',
    component: () => import('@/views/UuidGenerator/index.vue'),
  },
  {
    path: '/hash-generator',
    name: 'HashGenerator',
    component: () => import('@/views/HashGenerator/index.vue'),
  },
  {
    path: '/color-converter',
    name: 'ColorConverter',
    component: () => import('@/views/ColorConverter/index.vue'),
  },
  {
    path: '/qrcode-generator',
    name: 'QrCodeGenerator',
    component: () => import('@/views/QrCodeGenerator/index.vue'),
  },
  {
    path: '/text-diff',
    name: 'TextDiff',
    component: () => import('@/views/TextDiff/index.vue'),
  },
  {
    path: '/code-formatter',
    name: 'CodeFormatter',
    component: () => import('@/views/CodeFormatter/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

