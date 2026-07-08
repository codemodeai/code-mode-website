"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SocialFlipButton from "@/components/ui/social-flip-button";
import Image from "next/image";

// ── Integration data ──────────────────────────────────────────────
const integrations = [
  { name: "Stripe",       icon: "stripe" },
  { name: "Razorpay",    icon: "razorpay" },
  { name: "PayPal",      icon: "paypal" },
  { name: "Twilio",      icon: "twilio" },
  { name: "SendGrid",    icon: "sendgrid" },
  { name: "Firebase",    icon: "firebase" },
  { name: "Supabase",    icon: "supabase" },
  { name: "AWS",         icon: "aws" },
  { name: "OpenAI",      icon: "openai" },
  { name: "WhatsApp",    icon: "whatsapp" },
  { name: "Slack",       icon: "slack" },
  { name: "Shopify",     icon: "shopify" },
  { name: "HubSpot",     icon: "hubspot" },
  { name: "Zapier",      icon: "zapier" },
  { name: "MongoDB",     icon: "mongodb" },
  { name: "Google Cloud",icon: "gcloud" },
];

const ICON_PATHS: Record<string, { path: string; viewBox?: string }> = {
  stripe:   { path: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" },
  razorpay: { path: "M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" },
  paypal:   { path: "M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z" },
  twilio:   { path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20.8c-4.856 0-8.8-3.944-8.8-8.8S7.144 3.2 12 3.2s8.8 3.944 8.8 8.8-3.944 8.8-8.8 8.8zM9.6 10.4a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm4.8 0a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm-4.8 4.8a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm4.8 0a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2z" },
  sendgrid: { path: "M0 8.0001h7.9998v7.9998H0zm0-8.0001h7.9998v7.9999H0zM8 0h8v8H8zm8 0h8v8h-8zm0 8h8v8h-8zM8 16h8v8H8z" },
  firebase: { path: "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" },
  supabase: { path: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" },
  aws:      { path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.240-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .41-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM20.16 17.425c-2.395 1.77-5.874 2.708-8.864 2.708-4.195 0-7.97-1.549-10.82-4.127-.224-.2-.024-.472.248-.32 3.08 1.794 6.886 2.87 10.82 2.87 2.654 0 5.571-.55 8.257-1.686.407-.176.742.264.359.555zm1.006-1.15c-.304-.391-2.01-.184-2.775-.096-.232.024-.271-.175-.06-.32 1.357-.95 3.588-.678 3.852-.36.263.32-.072 2.55-1.341 3.612-.192.16-.383.08-.296-.136.288-.711.927-2.31.62-2.7z" },
  openai:   { path: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.676zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" },
  whatsapp: { path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" },
  slack:    { path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" },
  shopify:  { path: "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" },
  hubspot:  { path: "M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.193v.067a2.196 2.196 0 0 0 1.252 1.973l.013.006v2.852a6.22 6.22 0 0 0-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 1 0 4.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 0 0-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 0 0-.58-.095h-.002a2.033 2.033 0 1 0 2.033 2.033 1.978 1.978 0 0 0-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 1 0 4.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 1 1 3.215-3.207v.002a3.206 3.206 0 0 1-3.207 3.207z" },
  zapier:   { path: "M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm5.197 14.189-.687 6.29a836.651 836.651 0 0 1-1.411 3.352H5.25l-.008-.428-1.684-6.037-.434 6.037-.007.428H.991l-.668-6.297-1.09-6.897 2.384-.004.663 6.174.431-6.174h2.445l.01.428.668 5.697.673-5.697.01-.428h2.381zm3.714 4.003v3.498c0 .142-.116.259-.259.259h-2.45a.259.259 0 0 1-.259-.259v-3.497l-2.211-2.762 1.874-.004 1.281 1.795 1.279-1.795h1.87zm5.041-3.974c.714 0 1.3.587 1.3 1.3v5.312c0 .713-.586 1.298-1.3 1.298h-2.915a1.3 1.3 0 0 1-1.299-1.298v-5.312c0-.713.586-1.3 1.3-1.3zm-.487 1.911h-1.943a.243.243 0 0 0-.243.243v3.854c0 .134.109.243.243.243h1.943a.243.243 0 0 0 .243-.243v-3.854a.243.243 0 0 0-.243-.243zm4.677-1.911c.714 0 1.3.587 1.3 1.3v5.312c0 .713-.586 1.298-1.3 1.298h-1.943a1.3 1.3 0 0 1-1.3-1.298v-5.312c0-.713.587-1.3 1.3-1.3zm-.486 1.911h-.971a.243.243 0 0 0-.243.243v3.854c0 .134.109.243.243.243h.971a.243.243 0 0 0 .243-.243v-3.854a.243.243 0 0 0-.243-.243zM12 0a14.59 14.59 0 0 0-5.989 27.862v-2.191a.515.515 0 0 1 .516-.516h2.945c.285 0 .516.231.516.516v2.087A14.582 14.582 0 0 0 12 27.972a14.586 14.586 0 0 0 0-29.172z", viewBox: "0 0 28 28" },
  mongodb:  { path: "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" },
  gcloud:   { path: "M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" },
};

const IconSVG = ({ icon }: { icon: string }) => {
  const data = ICON_PATHS[icon];
  if (!data) return null;
  return (
    <svg
      width={28} height={28}
      viewBox={data.viewBox ?? "0 0 24 24"}
      fill="#111111"
      style={{ flexShrink: 0 }}
    >
      <path d={data.path} />
    </svg>
  );
};

function LogoSlider({ logos, direction }: { logos: typeof integrations; direction: "left" | "right" }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="marquee-track overflow-hidden">
      <div className={`flex gap-3 w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {doubled.map(({ name, icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-4 rounded-2xl px-8 py-5 shrink-0 select-none bg-white border border-gray-100"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)", minWidth: 230 }}
          >
            <span className="shrink-0" style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconSVG icon={icon} />
            </span>
            <span className="text-[17px] font-semibold text-gray-900 whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeModeLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center"
    >
      {/* Outer bloom */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-[8px]"
        style={{ background: "rgba(157,124,232,0.3)" }}
      />
      {/* Toggle pill */}
      <div
        className="relative flex items-center rounded-full px-[5px] py-[4px]"
        style={{
          background: "linear-gradient(135deg, #faf8ff 0%, #f3eefe 100%)",
          border: "1.5px solid rgba(157,124,232,0.6)",
          boxShadow: `0 0 0 1px rgba(157,124,232,0.1), 0 0 10px rgba(157,124,232,0.4), 0 0 24px rgba(157,124,232,0.2), inset 0 0 6px rgba(157,124,232,0.06)`,
          width: 68,
          height: 30,
        }}
      >
        <div className="flex items-center justify-center" style={{ width: 32, height: 22 }}>
          <span
            className="font-mono font-bold select-none"
            style={{
              fontSize: 10,
              letterSpacing: "-0.5px",
              color: "#6d42be",
              textShadow: "0 0 6px rgba(157,124,232,0.7)",
            }}
          >
            &lt;/&gt;
          </span>
        </div>
        <motion.div
          animate={{
            boxShadow: [
              "0 0 6px 2px rgba(157,124,232,0.6), 0 0 14px 4px rgba(157,124,232,0.3)",
              "0 0 10px 4px rgba(157,124,232,0.85), 0 0 22px 8px rgba(157,124,232,0.45)",
              "0 0 6px 2px rgba(157,124,232,0.6), 0 0 14px 4px rgba(157,124,232,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full flex-shrink-0"
          style={{
            width: 22,
            height: 22,
            background: "radial-gradient(circle at 35% 35%, #ede6fb, #bda2ef 55%, #7d5ad0)",
          }}
        />
      </div>
    </motion.div>
  );
}

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/resources", label: "Resources" },
  { href: "/book", label: "Book a Call" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "8%"]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white text-gray-900 overflow-hidden">

      {/* ── Background gradient blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Left orange blob — large, very dissolved */}
        <div
          className="absolute -left-64 top-0 h-[900px] w-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(189,162,239,0.28) 0%, rgba(157,124,232,0.12) 45%, transparent 72%)",
            filter: "blur(100px)",
          }}
        />
        {/* Right pink/coral blob — large, very dissolved */}
        <div
          className="absolute -right-64 top-1/4 h-[860px] w-[860px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,180,241,0.22) 0%, rgba(130,87,214,0.1) 45%, transparent 72%)",
            filter: "blur(110px)",
          }}
        />
        {/* Center warm haze — wide spread */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(237,230,251,0.18) 0%, rgba(189,162,239,0.06) 50%, transparent 72%)",
            filter: "blur(120px)",
          }}
        />
        {/* Extra top bleed — orange tint washing down from top-left */}
        <div
          className="absolute -top-40 -left-20 h-[600px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(222,210,247,0.2) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-20 flex items-center justify-between px-6 py-5 md:px-16 border-b border-black/5"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <CodeModeLogo />
          <span className="text-[17px] font-bold tracking-tight text-gray-900">
            Code<span className="text-orange-500">Mode</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] text-gray-500">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="hover:text-gray-900 transition-colors">{label}</a>
          ))}
        </div>

        {/* Desktop CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <motion.a
            href="/start"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            Get started free
          </motion.a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg border border-gray-200 bg-white"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-5 bg-gray-900 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-5 bg-gray-900 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-5 bg-gray-900 rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-20 md:hidden border-b border-black/5 bg-white/95 backdrop-blur-md px-6 pb-6 pt-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="/start"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-xl bg-gray-900 px-4 py-3 text-center text-[14px] font-semibold text-white hover:bg-gray-700 transition-colors"
              >
                Get started free ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center min-h-[88vh]"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-600"
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-orange-500"
          />
          Available for new projects
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[82px] font-semibold leading-[1.05] tracking-tight text-gray-900"
          >
            We build systems
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[82px] font-semibold leading-[1.05] tracking-tight"
          >
            that{" "}
            <span className="relative inline-block">
              <span className="text-orange-500">scale.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-orange-400"
              />
            </span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-md text-[15px] md:text-base text-gray-400 leading-relaxed"
        >
          SaaS products, CRM &amp; ERP systems, AI agents, and custom software —
          built for businesses that move fast and need tech that keeps up.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <motion.a
            href="/start"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            Start a project
            <span className="text-base">↗</span>
          </motion.a>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            See our work
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">→</span>
          </motion.a>
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-24 flex flex-col items-center gap-6"
        >
          <p className="text-xs text-gray-400 tracking-wide">Trusted by teams shipping real products</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["10+ Products", "50+ Clients", "5+ Years"].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-black text-gray-900">{item.split(" ")[0]}</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">{item.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 bg-[#f9f7f5] px-6 md:px-16 py-28 overflow-hidden">

        {/* Subtle texture bg */}
        <div className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">

          {/* Section eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Who we are</span>
          </motion.div>

          {/* ── BENTO GRID ── */}
          <div className="grid grid-cols-12 grid-rows-[auto] gap-3">

            {/* 1. Hero statement card — wide, tall */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-7 rounded-3xl bg-gray-900 p-10 flex flex-col justify-between overflow-hidden relative"
              style={{ minHeight: 300 }}
            >
              {/* Decorative orange orb inside card */}
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(157,124,232,0.35) 0%, transparent 70%)" }} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400 mb-6">Our mission</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-[1.15] tracking-tight">
                  We turn ambitious ideas into{" "}
                  <span className="text-orange-400">software that ships</span>{" "}
                  — and keeps shipping.
                </h2>
              </div>
              <p className="mt-6 text-[13px] text-white/50 leading-relaxed max-w-sm">
                CodeMode is a product engineering studio partnering with founders and operators
                to build software that actually works — on time, on budget, built to last.
              </p>
            </motion.div>

            {/* 2. Stat — Years */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              whileHover={{ y: -3 }}
              className="col-span-6 md:col-span-2 rounded-3xl bg-orange-500 p-7 flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Est.</span>
              <div>
                <p className="text-6xl font-black text-white leading-none">5+</p>
                <p className="mt-2 text-[11px] text-white/70 font-medium">Years building</p>
              </div>
            </motion.div>

            {/* 3. Stat — Clients */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              whileHover={{ y: -3 }}
              className="col-span-6 md:col-span-3 rounded-3xl border border-gray-200 bg-white p-7 flex flex-col justify-between"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Clients</span>
              <div>
                <p className="text-6xl font-black text-gray-900 leading-none">50+</p>
                <p className="mt-2 text-[11px] text-gray-400 font-medium">Teams served worldwide</p>
              </div>
            </motion.div>

            {/* 4. "We ship fast" card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              whileHover={{ y: -3 }}
              className="col-span-12 md:col-span-4 rounded-3xl border border-gray-200 bg-white p-8 flex flex-col gap-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Velocity</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-600 uppercase tracking-wide">Live</span>
              </div>
              <p className="text-2xl font-black text-gray-900 leading-tight">We ship MVPs in weeks, not quarters.</p>
              {/* Progress bars */}
              <div className="flex flex-col gap-2.5 mt-auto">
                {[["Scoping", "100%"], ["Design", "100%"], ["Dev", "87%"], ["Launch", "72%"]].map(([label, pct]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 w-12 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: pct }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-orange-400"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 w-8 text-right">{pct}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Systems card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.16 }}
              whileHover={{ y: -3 }}
              className="col-span-12 md:col-span-4 rounded-3xl bg-white border border-gray-200 p-8 flex flex-col justify-between overflow-hidden relative"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", minHeight: 220 }}
            >
              {/* Concentric rings decoration */}
              <div className="absolute -right-12 -bottom-12 opacity-[0.07]">
                {[120, 88, 56, 24].map((s) => (
                  <div key={s} className="absolute rounded-full border-2 border-orange-500"
                    style={{ width: s, height: s, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                ))}
              </div>
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9d7ce8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
                <p className="text-lg font-black text-gray-900 leading-tight">Built for scale<br/>from day one.</p>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Every system we build is architected to grow — clean APIs, modular code, zero shortcuts.
              </p>
            </motion.div>

            {/* 6. Partners card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.22 }}
              whileHover={{ y: -3 }}
              className="col-span-12 md:col-span-4 rounded-3xl bg-white border border-gray-200 p-8 flex flex-col justify-between"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)", minHeight: 220 }}
            >
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9d7ce8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <p className="text-lg font-black text-gray-900 leading-tight">We think like<br/>your co-founder.</p>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Full visibility, direct comms, shared ownership of outcomes — not a vendor relationship.
              </p>
            </motion.div>

            {/* 7. Products stat + CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -3 }}
              className="col-span-6 md:col-span-3 rounded-3xl border border-orange-200 bg-orange-50 p-7 flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Shipped</span>
              <div>
                <p className="text-6xl font-black text-orange-500 leading-none">10+</p>
                <p className="mt-2 text-[11px] text-orange-400 font-medium">Products live in market</p>
              </div>
            </motion.div>

            {/* 8. CTA card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              whileHover={{ y: -3 }}
              className="col-span-6 md:col-span-9 rounded-3xl bg-gray-900 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <p className="text-xl md:text-2xl font-black text-white leading-tight">
                Ready to build something <span className="text-orange-400">exceptional?</span>
              </p>
              <motion.a
                href="/start"
                whileHover={{ scale: 1.05, backgroundColor: "#8257d6" }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition-colors"
              >
                Let&apos;s talk ↗
              </motion.a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Integrations Marquee ── */}
      <section className="relative z-10 bg-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-16 mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400"
          >
            Integrates with the tools your business already runs on
          </motion.p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />
          <div className="space-y-3">
            <LogoSlider logos={integrations} direction="left" />
            <LogoSlider logos={integrations} direction="right" />
          </div>
        </div>
      </section>

      {/* ── Works ── */}
      <section id="work" className="relative z-10 bg-white px-6 md:px-16 py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="h-px w-8 bg-orange-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Selected work</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight"
              >
                Products we&apos;ve<br />shipped.
              </motion.h2>
            </div>
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="shrink-0 inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              Start your project ↗
            </motion.a>
          </div>

          {/* Featured project */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl overflow-hidden mb-4"
            style={{ minHeight: 420 }}
          >
            <div className="absolute inset-0 bg-gray-900">
              <video
                src="/work-home.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 70% 50%, rgba(157,124,232,0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(201,180,241,0.15) 0%, transparent 50%)"
              }} />
            </div>
            <div className="relative p-10 md:p-14 flex flex-col justify-between h-full" style={{ minHeight: 420 }}>
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">CRM · SaaS</span>
                <span className="text-white/20 text-[11px] font-mono">01</span>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">Arivo CRM</h3>
                <p className="text-white/50 text-[15px] max-w-lg leading-relaxed mb-8">A full-stack CRM platform built for logistics companies — real-time tracking, automated follow-ups, and a deal pipeline that cut sales cycles by 40%.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js", "PostgreSQL", "Redis", "AWS", "Stripe"].map(t => (
                    <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/50 font-medium">{t}</span>
                  ))}
                </div>
                <motion.a href="#contact" whileHover={{ x: 4 }} className="inline-flex items-center gap-2 text-[13px] font-semibold text-orange-400 hover:text-orange-300 transition-colors">View case study →</motion.a>
              </div>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "02", label: "Payment SaaS", title: "PayFlow", desc: "Automated payment reconciliation for e-commerce — syncs Stripe, Razorpay & PayPal in one dashboard.", tags: ["React", "Node.js", "Razorpay"], image: "/work-finance.jpg" },
              { num: "03", label: "AI Agent", title: "NeuralDesk", desc: "AI-powered support agent that deflects 70% of tickets with zero human intervention using GPT-4 + custom knowledge base.", tags: ["OpenAI", "Supabase", "Next.js"], image: "/work-crm.jpg" },
              { num: "04", label: "ERP · Inventory", title: "StockPilot", desc: "End-to-end inventory & ERP system for mid-market retail chains — real-time stock, multi-warehouse, automated PO generation.", tags: ["React", "Django", "PostgreSQL"], image: "/work-marketplace.jpg" },
            ].map(({ num, label, title, desc, tags, image }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-3xl overflow-hidden border border-gray-100 bg-white flex flex-col"
                style={{ minHeight: 340, boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
              >
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <Image src={image} alt={title} fill className="object-cover" />
                  <span className="absolute top-4 right-5 text-[11px] font-mono opacity-60 text-white drop-shadow">{num}</span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{label}</span>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map(t => <span key={t} className="rounded-md bg-gray-50 border border-gray-100 px-2 py-0.5 text-[10px] text-gray-500 font-medium">{t}</span>)}
                  </div>
                  <a href="#contact" className="text-[12px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">View case study →</a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex items-center justify-center"
          >
            <a href="/work" className="group inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-[14px] font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <span>See all projects</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white text-xs group-hover:bg-orange-400 transition-colors">↗</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="relative z-10 bg-[#f9f7f5] px-6 md:px-16 py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(0,0,0,0.03) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-orange-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">Our products</span>
              </motion.div>
              <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,ease:[0.16,1,0.3,1] }} className="font-display text-4xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
                Tools we built.<br />So you don&apos;t have to.
              </motion.h2>
            </div>
            <motion.a href="/products" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.2 }} className="shrink-0 text-[13px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">
              View all products ↗
            </motion.a>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                slug: "flowcrm",
                name: "CRM",
                tag: "White Label",
                tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
                desc: "A fully white-labelled CRM platform — custom branding, pipelines, contact management, and automations. Ship it as your own product.",
                features: ["White-label branding", "Pipeline Kanban", "Contact management", "Email automations", "CSV import/export"],
                accent: "from-emerald-400 to-teal-500",
                image: "/product-crm.jpg",
                imageBg: "#f0f4ff",
                badge: null,
              },
              {
                slug: "agentcore",
                name: "SEER",
                tag: "AI Tool",
                tagColor: "bg-orange-50 text-orange-600 border-orange-200",
                desc: "An AI-powered intelligence layer that sees across your business — surfacing insights, automating decisions, and flagging risks before they happen.",
                features: ["Real-time AI insights", "Predictive analytics", "Multi-source data sync", "Natural language queries", "Slack & email alerts"],
                accent: "from-brand-400 to-brand-600",
                image: "/product-seer.png",
                imageBg: "#9d7ce8",
                badge: "In Progress",
              },
              {
                slug: "launchkit",
                name: "Flox",
                tag: "Platform",
                tagColor: "bg-violet-50 text-violet-600 border-violet-200",
                desc: "A modern workflow and collaboration platform built for fast-moving teams — tasks, docs, and communication in one unified space.",
                features: ["Task & project tracking", "Docs & wikis", "Team collaboration", "Integrations & API", "Custom workflows"],
                accent: "from-violet-500 to-purple-600",
                image: "/product-flox.png",
                imageBg: "#1a1a2e",
                badge: null,
              },
            ].map(({ slug, name, tag, tagColor, desc, features, accent, image, imageBg, badge }, i) => (
              <motion.div
                key={slug}
                initial={{ opacity:0,y:28 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.55,delay:i*0.1,ease:[0.16,1,0.3,1] }}
                whileHover={{ y:-5,boxShadow:"0 20px 50px rgba(0,0,0,0.1)" }}
                className="group rounded-3xl bg-white border border-gray-100 overflow-hidden flex flex-col"
                style={{ boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}
              >
                {/* Card image */}
                <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 200, background: imageBg }}>
                  {image && (
                    <Image src={image} alt={name} fill className="object-contain p-6" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={`rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm bg-white/80 ${tagColor}`}>{tag}</span>
                    {badge && (
                      <span className="rounded-full border border-amber-300 bg-amber-50/90 backdrop-blur-sm px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600">{badge}</span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{name}</h3>
                  <p className="text-[13px] text-gray-400 leading-relaxed mb-6">{desc}</p>
                  <ul className="space-y-2 mb-7 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${accent} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                    <a href={`/products/${slug}`}>
                      <motion.span whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} className="inline-block rounded-xl bg-gray-900 px-5 py-2.5 text-[12px] font-bold text-white hover:bg-gray-700 transition-colors cursor-pointer">
                        Learn more →
                      </motion.span>
                    </a>
                    <a href="/start" className="text-[12px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">Book a call</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="relative z-10 bg-white px-6 md:px-16 py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full" style={{ background:"radial-gradient(circle,rgba(157,124,232,0.08) 0%,transparent 70%)",filter:"blur(80px)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }} className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-orange-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">What we do</span>
              </motion.div>
              <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,ease:[0.16,1,0.3,1] }} className="font-display text-4xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
                Services built for<br />ambitious teams.
              </motion.h2>
            </div>
            <motion.a href="/services" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.2 }} className="shrink-0 text-[13px] font-semibold text-gray-400 hover:text-gray-900 transition-colors">
              View all services ↗
            </motion.a>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                slug:"saas-development",
                num:"01",
                title:"SaaS Product Development",
                desc:"From zero to production-ready SaaS — architecture, backend, frontend, auth, billing and devops. We own the full stack so you can focus on growth.",
                tags:["Next.js","Node.js","PostgreSQL","Stripe","AWS"],
                bg:"#1e1b4b",
                illustration: (
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Browser window */}
                    <rect x="40" y="28" width="240" height="155" rx="12" fill="#2d2a5e" stroke="#4c3fcf" strokeWidth="1.5"/>
                    <rect x="40" y="28" width="240" height="32" rx="12" fill="#3730a3"/>
                    <rect x="40" y="47" width="240" height="13" fill="#3730a3"/>
                    <circle cx="60" cy="44" r="5" fill="#f87171"/>
                    <circle cx="76" cy="44" r="5" fill="#fbbf24"/>
                    <circle cx="92" cy="44" r="5" fill="#34d399"/>
                    <rect x="110" y="37" width="120" height="14" rx="7" fill="#4338ca" opacity="0.8"/>
                    <rect x="118" y="41" width="80" height="6" rx="3" fill="#818cf8" opacity="0.5"/>
                    {/* Code lines */}
                    <rect x="60" y="74" width="55" height="7" rx="3" fill="#c084fc"/>
                    <rect x="122" y="74" width="38" height="7" rx="3" fill="#9d7ce8"/>
                    <rect x="60" y="89" width="18" height="7" rx="3" fill="#60a5fa"/>
                    <rect x="84" y="89" width="70" height="7" rx="3" fill="#c084fc" opacity="0.8"/>
                    <rect x="60" y="104" width="45" height="7" rx="3" fill="#34d399"/>
                    <rect x="112" y="104" width="28" height="7" rx="3" fill="#9d7ce8" opacity="0.9"/>
                    <rect x="60" y="119" width="80" height="7" rx="3" fill="#818cf8" opacity="0.7"/>
                    <rect x="60" y="134" width="36" height="7" rx="3" fill="#60a5fa" opacity="0.9"/>
                    <rect x="103" y="134" width="50" height="7" rx="3" fill="#34d399" opacity="0.8"/>
                    <rect x="60" y="149" width="25" height="7" rx="3" fill="#9d7ce8" opacity="0.7"/>
                    {/* Floating card */}
                    <rect x="188" y="92" width="76" height="70" rx="10" fill="#312e81" stroke="#4f46e5" strokeWidth="1.5"/>
                    <rect x="196" y="104" width="42" height="6" rx="3" fill="#9d7ce8"/>
                    <rect x="196" y="116" width="30" height="5" rx="2" fill="#818cf8" opacity="0.7"/>
                    <rect x="196" y="127" width="54" height="14" rx="7" fill="#9d7ce8" opacity="0.9"/>
                    <rect x="202" y="131" width="30" height="6" rx="3" fill="#fff" opacity="0.9"/>
                    {/* Sparkles */}
                    <circle cx="268" cy="36" r="5" fill="#c084fc"/>
                    <circle cx="50" cy="170" r="4" fill="#9d7ce8"/>
                    <circle cx="282" cy="158" r="6" fill="#34d399" opacity="0.8"/>
                    <circle cx="30" cy="90" r="3" fill="#60a5fa" opacity="0.7"/>
                  </svg>
                ),
              },
              {
                slug:"ai-automation",
                num:"02",
                title:"AI & Automation",
                desc:"Custom AI agents, LLM integrations, RAG pipelines and workflow automation that cut manual work and unlock capabilities your competitors don't have.",
                tags:["OpenAI","Anthropic","LangChain","Supabase","Python"],
                bg:"#0f172a",
                illustration: (
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Pulse rings */}
                    <circle cx="160" cy="100" r="70" stroke="#9d7ce8" strokeWidth="1" opacity="0.15"/>
                    <circle cx="160" cy="100" r="52" stroke="#9d7ce8" strokeWidth="1" opacity="0.25"/>
                    {/* Central brain node */}
                    <circle cx="160" cy="100" r="34" fill="#1e293b" stroke="#9d7ce8" strokeWidth="2"/>
                    <circle cx="160" cy="100" r="22" fill="#9d7ce8" opacity="0.15"/>
                    <path d="M148 93 Q153 82 160 85 Q167 82 172 93 Q177 102 172 111 Q167 120 160 117 Q153 120 148 111 Q143 102 148 93Z" fill="#9d7ce8" opacity="0.6"/>
                    <circle cx="160" cy="100" r="9" fill="#9d7ce8"/>
                    <circle cx="160" cy="100" r="4" fill="#fff"/>
                    {/* Orbiting nodes */}
                    <circle cx="76" cy="58" r="20" fill="#1e293b" stroke="#bda2ef" strokeWidth="2"/>
                    <text x="76" y="63" textAnchor="middle" fontSize="13" fill="#bda2ef" fontWeight="bold">AI</text>
                    <circle cx="244" cy="58" r="20" fill="#1e293b" stroke="#c084fc" strokeWidth="2"/>
                    <text x="244" y="63" textAnchor="middle" fontSize="10" fill="#c084fc" fontWeight="bold">LLM</text>
                    <circle cx="76" cy="143" r="20" fill="#1e293b" stroke="#34d399" strokeWidth="2"/>
                    <text x="76" y="148" textAnchor="middle" fontSize="10" fill="#34d399" fontWeight="bold">RAG</text>
                    <circle cx="244" cy="143" r="20" fill="#1e293b" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="244" y="148" textAnchor="middle" fontSize="10" fill="#60a5fa" fontWeight="bold">API</text>
                    {/* Connecting lines */}
                    <line x1="95" y1="66" x2="130" y2="86" stroke="#9d7ce8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"/>
                    <line x1="225" y1="66" x2="190" y2="86" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"/>
                    <line x1="95" y1="135" x2="130" y2="114" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"/>
                    <line x1="225" y1="135" x2="190" y2="114" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8"/>
                    {/* Dots on lines */}
                    <circle cx="113" cy="76" r="3" fill="#9d7ce8"/>
                    <circle cx="207" cy="76" r="3" fill="#c084fc"/>
                    <circle cx="113" cy="124" r="3" fill="#34d399"/>
                    <circle cx="207" cy="124" r="3" fill="#60a5fa"/>
                    {/* Corner accents */}
                    <circle cx="160" cy="22" r="4" fill="#9d7ce8" opacity="0.6"/>
                    <circle cx="160" cy="178" r="4" fill="#9d7ce8" opacity="0.6"/>
                    <circle cx="30" cy="100" r="4" fill="#9d7ce8" opacity="0.4"/>
                    <circle cx="290" cy="100" r="4" fill="#9d7ce8" opacity="0.4"/>
                  </svg>
                ),
              },
              {
                slug:"crm-erp",
                num:"03",
                title:"CRM & ERP Systems",
                desc:"Custom-built CRM and ERP platforms tailored to your exact workflow — no off-the-shelf compromises, no paying for features you don't need.",
                tags:["React","Django","PostgreSQL","Redis","AWS"],
                bg:"#052e16",
                illustration: (
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Dashboard frame */}
                    <rect x="28" y="22" width="264" height="158" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="1.5"/>
                    {/* Top bar */}
                    <rect x="28" y="22" width="264" height="30" rx="12" fill="#065f46"/>
                    <rect x="28" y="40" width="264" height="12" fill="#065f46"/>
                    <rect x="42" y="30" width="70" height="12" rx="6" fill="#059669" opacity="0.6"/>
                    <circle cx="262" cy="36" r="6" fill="#34d399" opacity="0.8"/>
                    <circle cx="278" cy="36" r="6" fill="#9d7ce8" opacity="0.6"/>
                    {/* Sidebar */}
                    <rect x="28" y="52" width="58" height="128" fill="#065f46"/>
                    <rect x="36" y="64" width="36" height="8" rx="4" fill="#34d399" opacity="0.9"/>
                    <rect x="36" y="80" width="28" height="8" rx="4" fill="#6ee7b7" opacity="0.5"/>
                    <rect x="36" y="96" width="34" height="8" rx="4" fill="#6ee7b7" opacity="0.5"/>
                    <rect x="36" y="112" width="24" height="8" rx="4" fill="#9d7ce8" opacity="0.8"/>
                    <rect x="36" y="128" width="30" height="8" rx="4" fill="#6ee7b7" opacity="0.4"/>
                    <rect x="36" y="144" width="36" height="8" rx="4" fill="#6ee7b7" opacity="0.3"/>
                    {/* Column headers */}
                    <rect x="94" y="57" width="58" height="15" rx="5" fill="#059669" opacity="0.8"/>
                    <rect x="98" y="60" width="28" height="8" rx="3" fill="#34d399"/>
                    <rect x="158" y="57" width="58" height="15" rx="5" fill="#d97706" opacity="0.8"/>
                    <rect x="162" y="60" width="28" height="8" rx="3" fill="#fbbf24"/>
                    <rect x="222" y="57" width="58" height="15" rx="5" fill="#9d7ce8" opacity="0.8"/>
                    <rect x="226" y="60" width="28" height="8" rx="3" fill="#bda2ef"/>
                    {/* Kanban cards col 1 */}
                    <rect x="94" y="78" width="58" height="40" rx="7" fill="#065f46" stroke="#059669" strokeWidth="1.2"/>
                    <rect x="100" y="85" width="38" height="6" rx="3" fill="#34d399"/>
                    <rect x="100" y="96" width="26" height="5" rx="2" fill="#6ee7b7" opacity="0.6"/>
                    <circle cx="138" cy="108" r="5" fill="#059669"/>
                    <rect x="94" y="124" width="58" height="40" rx="7" fill="#065f46" stroke="#059669" strokeWidth="1.2"/>
                    <rect x="100" y="131" width="30" height="6" rx="3" fill="#34d399" opacity="0.8"/>
                    <rect x="100" y="142" width="42" height="5" rx="2" fill="#6ee7b7" opacity="0.5"/>
                    {/* Kanban cards col 2 */}
                    <rect x="158" y="78" width="58" height="40" rx="7" fill="#064e3b" stroke="#d97706" strokeWidth="1.2"/>
                    <rect x="164" y="85" width="34" height="6" rx="3" fill="#fbbf24"/>
                    <rect x="164" y="96" width="22" height="5" rx="2" fill="#ede6fb" opacity="0.6"/>
                    <circle cx="202" cy="108" r="5" fill="#d97706"/>
                    {/* Kanban cards col 3 (active/won) */}
                    <rect x="222" y="78" width="58" height="96" rx="7" fill="#2a2140" stroke="#9d7ce8" strokeWidth="1.5"/>
                    <rect x="228" y="85" width="34" height="6" rx="3" fill="#9d7ce8"/>
                    <rect x="228" y="96" width="42" height="5" rx="2" fill="#d3c1f3" opacity="0.6"/>
                    <rect x="228" y="107" width="20" height="5" rx="2" fill="#d3c1f3" opacity="0.4"/>
                    <rect x="228" y="122" width="44" height="16" rx="7" fill="#9d7ce8"/>
                    <rect x="234" y="127" width="22" height="6" rx="3" fill="#fff" opacity="0.9"/>
                    <rect x="228" y="145" width="36" height="6" rx="3" fill="#d3c1f3" opacity="0.5"/>
                    <rect x="228" y="157" width="26" height="8" rx="4" fill="#9d7ce8" opacity="0.4"/>
                  </svg>
                ),
              },
              {
                slug:"mobile-apps",
                num:"04",
                title:"Mobile App Development",
                desc:"Cross-platform iOS & Android apps with native performance. From consumer apps to internal tools — built fast, tested thoroughly, maintained long-term.",
                tags:["React Native","Expo","Supabase","Firebase","TypeScript"],
                bg:"#0c1445",
                illustration: (
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Main phone */}
                    <rect x="106" y="12" width="108" height="178" rx="22" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
                    <rect x="111" y="17" width="98" height="168" rx="18" fill="#172554"/>
                    {/* Dynamic island */}
                    <rect x="143" y="20" width="34" height="11" rx="5.5" fill="#0c1445"/>
                    {/* Status bar */}
                    <rect x="118" y="36" width="84" height="10" rx="3" fill="#1e3a8a" opacity="0.6"/>
                    <rect x="120" y="38" width="30" height="5" rx="2" fill="#60a5fa" opacity="0.7"/>
                    <rect x="186" y="38" width="14" height="5" rx="2" fill="#34d399" opacity="0.7"/>
                    {/* App icons row 1 */}
                    <rect x="118" y="52" width="26" height="26" rx="8" fill="#2563eb"/>
                    <rect x="122" y="58" width="18" height="12" rx="3" fill="#93c5fd" opacity="0.8"/>
                    <rect x="150" y="52" width="26" height="26" rx="8" fill="#9d7ce8"/>
                    <rect x="154" y="56" width="18" height="18" rx="4" fill="#e3d8f8" opacity="0.7"/>
                    <rect x="182" y="52" width="26" height="26" rx="8" fill="#059669"/>
                    <rect x="186" y="56" width="18" height="18" rx="4" fill="#6ee7b7" opacity="0.7"/>
                    {/* App icons row 2 */}
                    <rect x="118" y="84" width="26" height="26" rx="8" fill="#7c3aed"/>
                    <rect x="150" y="84" width="26" height="26" rx="8" fill="#e11d48"/>
                    <rect x="182" y="84" width="26" height="26" rx="8" fill="#0891b2"/>
                    {/* Hero card */}
                    <rect x="116" y="117" width="88" height="50" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.2"/>
                    <rect x="123" y="124" width="50" height="7" rx="3" fill="#60a5fa"/>
                    <rect x="123" y="135" width="66" height="5" rx="2" fill="#3b82f6" opacity="0.5"/>
                    <rect x="123" y="144" width="44" height="14" rx="7" fill="#2563eb"/>
                    <rect x="129" y="148" width="24" height="6" rx="3" fill="#fff" opacity="0.9"/>
                    {/* Home indicator */}
                    <rect x="143" y="174" width="34" height="5" rx="2.5" fill="#3b82f6" opacity="0.5"/>
                    {/* Second phone (background) */}
                    <rect x="228" y="36" width="72" height="130" rx="16" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8"/>
                    <rect x="233" y="41" width="62" height="120" rx="12" fill="#172554" opacity="0.9"/>
                    <rect x="240" y="52" width="48" height="8" rx="3" fill="#3b82f6" opacity="0.4"/>
                    <rect x="240" y="66" width="48" height="34" rx="7" fill="#1e3a8a"/>
                    <rect x="246" y="72" width="36" height="5" rx="2" fill="#60a5fa" opacity="0.7"/>
                    <rect x="246" y="81" width="26" height="5" rx="2" fill="#93c5fd" opacity="0.4"/>
                    <rect x="240" y="106" width="22" height="22" rx="6" fill="#9d7ce8"/>
                    <rect x="266" y="106" width="22" height="22" rx="6" fill="#7c3aed"/>
                    <rect x="240" y="134" width="48" height="16" rx="7" fill="#2563eb"/>
                    <rect x="248" y="139" width="24" height="6" rx="3" fill="#fff" opacity="0.8"/>
                    {/* Floating notification */}
                    <rect x="20" y="55" width="82" height="50" rx="12" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5"/>
                    <circle cx="38" cy="72" r="10" fill="#9d7ce8"/>
                    <rect x="52" y="65" width="40" height="6" rx="3" fill="#60a5fa"/>
                    <rect x="52" y="75" width="30" height="5" rx="2" fill="#3b82f6" opacity="0.5"/>
                    <rect x="52" y="85" width="20" height="5" rx="2" fill="#34d399" opacity="0.6"/>
                    {/* Decorative dots */}
                    <circle cx="20" cy="145" r="5" fill="#9d7ce8" opacity="0.7"/>
                    <circle cx="302" cy="40" r="5" fill="#3b82f6" opacity="0.7"/>
                    <circle cx="302" cy="160" r="4" fill="#7c3aed" opacity="0.6"/>
                    <circle cx="70" cy="170" r="4" fill="#34d399" opacity="0.5"/>
                  </svg>
                ),
              },
            ].map(({ slug, num, title, desc, tags, bg, illustration },i) => (
              <motion.div
                key={slug}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.55, delay:i*0.08, ease:[0.16,1,0.3,1] }}
                className="group relative rounded-3xl border border-gray-100 bg-white overflow-hidden flex flex-col"
                style={{ boxShadow:"0 2px 20px rgba(0,0,0,0.04)" }}
              >
                {/* Illustration */}
                <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 200, background: bg }}>
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    {illustration}
                  </div>
                  <span className="absolute top-4 right-5 font-mono text-[11px] text-gray-300">{num}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8 gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">{title}</h3>
                    <p className="text-[14px] text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(t => (
                        <span key={t} className="rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1 text-[10px] text-gray-500 font-medium">{t}</span>
                      ))}
                    </div>
                    <a href={`/services/${slug}`} className="shrink-0">
                      <motion.span
                        whileHover={{ scale:1.05 }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white text-sm group-hover:bg-orange-500 transition-colors duration-300 cursor-pointer"
                      >
                        →
                      </motion.span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process strip */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1 }}
            className="mt-6 rounded-3xl border border-gray-100 bg-[#f9f7f5] px-8 py-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">How we work</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step:"1", label:"Discovery", desc:"We map your goals, users and constraints in one focused session." },
                { step:"2", label:"Scope & Plan", desc:"A fixed scope, timeline and cost — no surprises later." },
                { step:"3", label:"Build & Ship", desc:"Weekly demos, continuous deployment, full transparency." },
                { step:"4", label:"Grow", desc:"Post-launch support, iteration and scaling as you grow." },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white shrink-0">{step}</span>
                    <span className="font-black text-gray-900 text-[14px]">{label}</span>
                  </div>
                  <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative z-10 bg-gray-900 px-6 md:px-16 py-28 overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 bottom-0 h-[600px] w-[600px] rounded-full" style={{ background:"radial-gradient(circle,rgba(157,124,232,0.2) 0%,transparent 70%)",filter:"blur(100px)" }} />
          <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full" style={{ background:"radial-gradient(circle,rgba(201,180,241,0.12) 0%,transparent 70%)",filter:"blur(100px)" }} />
          <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.03) 1px,transparent 0)",backgroundSize:"32px 32px" }} />
        </div>
        <div className="relative max-w-6xl mx-auto">
          {/* Top label */}
          <motion.div initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }} className="flex items-center gap-3 mb-12">
            <span className="h-px w-8 bg-orange-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Get in touch</span>
          </motion.div>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

            {/* Left */}
            <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.65,ease:[0.16,1,0.3,1] }}>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.08] tracking-tight mb-6">
                Let&apos;s build<br />something <span className="text-orange-400">great.</span>
              </h2>
              <p className="text-[15px] text-white/50 leading-relaxed mb-12 max-w-sm">
                Tell us about your project and we&apos;ll get back to you within 24 hours with a plan and a rough estimate.
              </p>

              {/* Contact details */}
              <div className="space-y-6 mb-12">
                {[
                  { label:"Email", value:"support@codemodeai.com", href:"mailto:support@codemodeai.com" },
                  { label:"Response time", value:"Within 24 hours", href:null },
                  { label:"Based in", value:"India · Working globally", href:null },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 w-28 pt-0.5 shrink-0">{label}</span>
                    {href
                      ? <a href={href} className="text-[14px] text-white font-semibold hover:text-orange-400 transition-colors">{value}</a>
                      : <span className="text-[14px] text-white font-semibold">{value}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {["No spam","Reply within 24h","Fixed-price projects","NDA on request"].map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />{b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.form
              initial={{ opacity:0,x:24 }}
              whileInView={{ opacity:1,x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.65,ease:[0.16,1,0.3,1] }}
              onSubmit={e => e.preventDefault()}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col gap-5 backdrop-blur-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Name</label>
                  <input type="text" placeholder="Your name" className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/10 transition-all" style={{ background:"rgba(255,255,255,0.06)" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input type="email" placeholder="you@company.com" className="rounded-xl border border-white/10 px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/10 transition-all" style={{ background:"rgba(255,255,255,0.06)" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Project type</label>
                <select className="rounded-xl border border-white/10 px-4 py-3 text-[14px] text-white/60 outline-none focus:border-orange-400/50 transition-all appearance-none" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <option value="" className="bg-gray-900">Select a project type</option>
                  <option className="bg-gray-900">SaaS Product</option>
                  <option className="bg-gray-900">CRM / ERP System</option>
                  <option className="bg-gray-900">AI Agent / Automation</option>
                  <option className="bg-gray-900">Mobile App</option>
                  <option className="bg-gray-900">Marketplace</option>
                  <option className="bg-gray-900">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Budget range</label>
                <select className="rounded-xl border border-white/10 px-4 py-3 text-[14px] text-white/60 outline-none focus:border-orange-400/50 transition-all appearance-none" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <option value="" className="bg-gray-900">Select a budget range</option>
                  <option className="bg-gray-900">Under ₹5L</option>
                  <option className="bg-gray-900">₹5L – ₹15L</option>
                  <option className="bg-gray-900">₹15L – ₹50L</option>
                  <option className="bg-gray-900">₹50L+</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Tell us about your project</label>
                <textarea rows={4} placeholder="Describe your idea, goals, and timeline..." className="rounded-xl border border-white/10 px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/10 transition-all resize-none" style={{ background:"rgba(255,255,255,0.06)" }} />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale:1.02, boxShadow:"0 0 40px rgba(157,124,232,0.5)" }}
                whileTap={{ scale:0.98 }}
                className="w-full rounded-xl bg-orange-500 py-4 text-[14px] font-bold text-white hover:bg-orange-400 transition-colors mt-1"
                style={{ boxShadow:"0 0 24px rgba(157,124,232,0.35)" }}
              >
                Send message ↗
              </motion.button>

              <p className="text-center text-[11px] text-white/25">No spam. We reply within 24 hours.</p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/10 bg-gray-900 px-6 md:px-16 py-8 md:py-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <span className="text-[14px] font-bold text-white">Code<span className="text-orange-500">Mode</span></span>
          <SocialFlipButton />
          <p className="text-[12px] text-white/30 text-center">© 2025 CodeMode. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
